import { Link, useLocation, useParams } from "react-router-dom";
import { TransitionOverlay } from "../../Transition/transition";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectDetailsType, projectsInfos } from "../../ProjectsInfos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./detailsStyles.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetails() {
  const { name: projectName } = useParams();

  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>({
    title: "",
    desc: "",
    img: "",
    responsive: false,
    to: "",
    repo: "",
    live: "",
  });
  const [projectIndx, setProjectIndx] = useState(0);
  const [showNextProjectImg, setShowNextProjectImg] = useState(false);
  const [showPrevProjectImg, setShowPrevProjectImg] = useState(false);
  const [previewImgPath, setPreviewImgPath] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const minLg = gsap.matchMedia();

  const prevProjectDetails =
    projectsInfos[
      projectIndx - 1 < 0 ? projectsInfos.length - 1 : projectIndx - 1
    ];

  const nextProjectDetails =
    projectsInfos[
      projectIndx + 1 === projectsInfos.length ? 0 : projectIndx + 1
    ];

  // ANCHOR USELAYOUT EFFECT  ||========================================================================
  useLayoutEffect(() => {
    const projectFilteredArr = projectsInfos.filter(
      ({ to }) => to === projectName
    );
    setProjectDetails(projectFilteredArr[0]);
    setProjectIndx(projectsInfos.indexOf(projectFilteredArr[0]));
  }, [projectName]);

  const { pathname } = useLocation();
  useEffect(() => {
    const imgArr = document.querySelectorAll<HTMLImageElement>("img");
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    const video = document.querySelector<HTMLVideoElement>("video");
    minLg.add("(min-width: 1024px)", () => {
      imgArr.forEach((img) => {
        img.addEventListener("mouseenter", () => {
          if (cursor) cursor.style.borderWidth = "2px";
        });
        video?.addEventListener("mouseenter", () => {
          if (cursor) cursor.style.borderWidth = "2px";
        });

        img.addEventListener("mouseleave", () => {
          if (cursor) cursor.style.borderWidth = "0";
        });
        video?.addEventListener("mouseleave", () => {
          if (cursor) cursor.style.borderWidth = "0";
        });
      });
    });

    return () => {
      if (cursor) cursor.style.borderWidth = "0";
      handleMouseLeave();
    };
  }, [pathname, minLg]);

  // ANCHOR USEEFFECT  ||========================================================================
  useEffect(() => {
    minLg.add("(min-width:1024px)", () => {
      const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
      if (cursor) {
        cursor.style.mixBlendMode = "";
        cursor.style.color = "var(--text-color)";
        cursor.style.scale = "1";
        cursor.style.zIndex = "11";
      }

      const textBlendElements =
        document.querySelectorAll<HTMLElement>(".__cursor-blend");

      textBlendElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        textBlendElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    });
  }, [minLg]);

  // ANCHOR FUNCTIONS  ||========================================================================
  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";

      cursorElement.style.backgroundColor = "#E7E5E4";
      cursorElement.style.mixBlendMode = "difference";
    }
  };

  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";
      cursorElement.style.mixBlendMode = "";
      cursorElement.style.backgroundColor = "var(--text-color)";
    }
  };

  const cursorHoverColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) {
      cursor.style.mixBlendMode = "difference";
      cursor.style.backgroundColor = "var(--bg-color)";
    }
  };

  const cursorLeaveColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) {
      cursor.style.mixBlendMode = "";
      cursor.style.backgroundColor = "var(--text-color)";
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        const cursor =
          document.querySelector<HTMLDivElement>(".__custom-cursor");
        if (cursor) {
          cursor.style.cursor = "default";
        }

        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <TransitionOverlay>
      <section className="min-h-[100dvh] __section-padding lg:mt-8 mt-0 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 overflow-hidden">
        <div className="flex justify-between overflow-hidden md:items-center">
          <h1
            className={`__section-title __cursor-blend`}
            style={{ margin: 0 }}
          >
            {projectDetails.title}
          </h1>
          {projectDetails.live ? (
            <Link
              to={projectDetails.live}
              target="_blank"
              className={`expand-bg border rounded-md __section-desc lg:px-8 md:px-6 px-4 sm:mr-0 h-fit my-auto flex items-center gap-4`}
              onMouseEnter={cursorHoverColorChange}
              onMouseLeave={cursorLeaveColorChange}
            >
              Preview{" "}
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-12 grid-rows-2">
          <div className="lg:text-xl row-span-1 lg:leading-[2rem] font-[500] md:text-lg md:leading-[1.5rem] text-base leading-[1.5rem] lg:col-span-8 md:col-span-10 col-span-12 w-fit __cursor-blend">
            {projectDetails.desc}
          </div>
        </div>
        <img
          src={`/portfolio/assets/projects/${projectDetails.img}/logo.png`}
          alt={projectDetails.title}
          className="md:w-[80%] w-full mx-auto lg:mt-12 rounded-md relative border-2 border-neutral-700"
        />

        {/* ANCHOR RESPONSIVE IMAGES  ||========================================================== */}
        {projectDetails.responsive && (
          <div className="flex flex-col items-start justify-around gap-16 md:flex-row">
            <img
              src={`/portfolio/assets/projects/${projectDetails.img}/responsive-1.png`}
              className="mx-auto border-2 rounded-md w-72 border-neutral-700"
            />
            <img
              src={`/portfolio/assets/projects/${projectDetails.img}/responsive-2.png`}
              className="mx-auto border-2 rounded-md w-72 border-neutral-700"
            />
            <img
              src={`/portfolio/assets/projects/${projectDetails.img}/responsive-3.png`}
              className="mx-auto border-2 rounded-md w-72 border-neutral-700"
            />
          </div>
        )}

        {/* ANCHOR VIDEO  ||========================================================== */}
        <div className="py-12">
          <video
            src={`/portfolio/assets/projects/${projectDetails.img}/sample.mp4`}
            ref={videoRef}
            loop
            muted
            controls={false}
            playsInline
            autoPlay
            className="max-h-[35rem] mx-auto border-2 border-neutral-700"
            onClick={handleFullscreen}
          />
        </div>

        {/* ANCHOR NEXT PROJECT  ||========================================================== */}
        <div className="relative z-10 px-0 py-3 border-t-2 lg:py-12 md:py-6 border-neutral-600 lg:px-10 md:px-5">
          <div className="flex flex-col items-center justify-between md:flex-row gap-y-4">
            <div
              className="project-link"
              onMouseEnter={() => {
                setShowPrevProjectImg(true);
                setPreviewImgPath(prevProjectDetails.img);
              }}
              onMouseLeave={() => setShowPrevProjectImg(false)}
            >
              <span className="text-2xl font-semibold lg:text-6xl md:text-4xl">
                Previous project
              </span>
              <Link
                to={`/portfolio/projects/${prevProjectDetails.to}`}
                className="text-2xl lg:text-6xl md:text-4xl __nav-underline-element"
                onMouseEnter={() => {
                  cursorHoverColorChange();
                }}
                onMouseLeave={() => {
                  cursorLeaveColorChange();
                }}
              >
                {prevProjectDetails.title}
              </Link>
            </div>
            <div
              className="project-link"
              onMouseEnter={() => {
                setShowNextProjectImg(true);
                setPreviewImgPath(nextProjectDetails.img);
              }}
              onMouseLeave={() => setShowNextProjectImg(false)}
            >
              <span className="text-2xl font-semibold lg:text-6xl md:text-4xl">
                Next project
              </span>
              <Link
                to={`/portfolio/projects/${nextProjectDetails.to}`}
                className="text-2xl lg:text-6xl md:text-4xl __nav-underline-element"
                onMouseEnter={() => {
                  cursorHoverColorChange();
                }}
                onMouseLeave={() => {
                  cursorLeaveColorChange();
                }}
              >
                {nextProjectDetails.title}
              </Link>
            </div>
          </div>

          <div
            className={`absolute w-full top-0 -z-10 left-1/2 duration-300 -translate-x-1/2 next-project-img-hider`}
          >
            <img
              src={`/portfolio/assets/projects/${
                showNextProjectImg
                  ? nextProjectDetails.img
                  : prevProjectDetails.img
              }/logo.png`}
              alt={
                showNextProjectImg
                  ? nextProjectDetails.title
                  : prevProjectDetails.title
              }
              className="opacity-0"
            />
          </div>
          <div
            className={`rounded-lg overflow-hidden absolute md:w-1/2 w-3/4 top-0 -z-20 left-1/2 duration-300 -translate-x-1/2 border-2 border-neutral-700 ${
              showNextProjectImg || showPrevProjectImg
                ? "-translate-y-1/4"
                : "translate-y-0"
            }`}
          >
            <img
              src={`/portfolio/assets/projects/${previewImgPath}/logo.png`}
              alt={
                showNextProjectImg
                  ? nextProjectDetails.title
                  : prevProjectDetails.title
              }
              className="w-full"
            />
          </div>
        </div>
      </section>
    </TransitionOverlay>
  );
}

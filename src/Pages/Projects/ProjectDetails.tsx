import { Link, useLocation, useParams } from "react-router-dom";
import { TransitionOverlay } from "../../Transition/transition";
import { useEffect, useLayoutEffect, useState } from "react";
import { projectsInfos } from "../../ProjectsInfos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./detailsStyles.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetails() {
  const { name: projectName } = useParams();

  const [projectDetails, setProjectDetails] = useState<{
    readonly title: string;
    readonly img: string;
    readonly desc: string;
    readonly to: string;
    readonly live?: string;
  }>({
    title: "",
    img: "",
    desc: "",
    to: "",
    live: "",
  });
  const [projectIndx, setProjectIndx] = useState(0);
  const [showNextProjectImg, setShowNextProjectImg] = useState(false);

  const minLg = gsap.matchMedia();

  const nextProjectDetails =
    projectsInfos[
      projectIndx + 1 === projectsInfos.length ? 0 : projectIndx + 1
    ];

  // ANCHOR USELAYOUT EFFECT  ||========================================================================
  useLayoutEffect(() => {
    // window.scrollTo({ top: 0 });
    const projectFilteredArr = projectsInfos.filter(
      ({ to }) => to === projectName
    );
    setProjectDetails(projectFilteredArr[0]);
    setProjectIndx(projectsInfos.indexOf(projectFilteredArr[0]));
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
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
  }, [pathname]);

  // ANCHOR USEEFFECT  ||========================================================================
  useEffect(() => {
    document.body.classList.remove("__dark-mode");

    // ANCHOR CURSOR  ||========================================================================

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

      // gsap.to(".__parallax-img", {
      //   scrollTrigger: {
      //     trigger: ".__parallax-img",
      //     start: "top bottom",
      //     end: "bottom top",
      //     scrub: true,
      //   },
      //   translateY: "-25%",
      // });

      return () => {
        textBlendElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    });
  }, []);

  // ANCHOR FUNCTIONS  ||========================================================================
  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";

      cursorElement.style.backgroundColor = "#e7e5e4";
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

  return (
    <TransitionOverlay>
      <section className="min-h-[100dvh] __section-padding lg:mt-8 mt-0 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 overflow-hidden">
        <div className="flex justify-between md:items-center overflow-hidden">
          <span
            className={`__section-title __cursor-blend`}
            style={{ margin: 0 }}
          >
            {projectDetails.title}
          </span>
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
        <div className="grid grid-cols-12">
          <div className="lg:text-xl lg:leading-[2rem] font-[500] md:text-lg md:leading-[1.5rem] text-base leading-[1.5rem] lg:col-span-8 md:col-span-10 col-span-12 w-fit __cursor-blend">
            {projectDetails.desc}
          </div>
        </div>
        <img
          src={`/portfolio/assets/projects/${projectDetails.img}/logo.png`}
          alt={projectDetails.title}
          className="md:w-[80%] w-full mx-auto lg:mt-12 rounded-md relative border-2 border-neutral-700"
        />

        {/* ANCHOR RESPONSIVE IMAGES  ||========================================================== */}
        <div className="flex md:flex-row flex-col gap-16 items-start justify-around">
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-1.png`}
            className="w-72 mx-auto border-2 border-neutral-700 rounded-md"
          />
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-2.png`}
            className="w-72 mx-auto border-2 border-neutral-700 rounded-md"
          />
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-3.png`}
            className="w-72 mx-auto border-2 border-neutral-700 rounded-md"
          />
        </div>

        {/* ANCHOR VIDEO  ||========================================================== */}
        <div className="py-12">
          <video
            src={`/portfolio/assets/projects/${projectDetails.img}/sample.mp4`}
            loop
            muted
            playsInline
            autoPlay
            className="max-h-[35rem] mx-auto border-2 border-neutral-700"
          />
        </div>

        {/* ANCHOR NEXT PROJECT  ||========================================================== */}
        <div className="lg:py-12 md:py-6 py-3 border-t border-neutral-600 lg:px-10 md:px-5 px-0 relative z-10">
          <div className="flex md:flex-row flex-col gap-y-4 justify-between items-center">
            <span className="lg:text-6xl md:text-4xl text-2xl font-semibold">
              Next project
            </span>
            <Link
              to={`/portfolio/projects/${nextProjectDetails.to}`}
              className="lg:text-5xl md:text-4xl text-3xl __nav-underline-element"
              onMouseEnter={() => setShowNextProjectImg(true)}
              onMouseLeave={() => setShowNextProjectImg(false)}
            >
              {nextProjectDetails.title}
            </Link>
          </div>
          <div
            className={`absolute w-full top-0 -z-10 left-1/2 duration-300 -translate-x-1/2 next-project-img-hider`}
          >
            <img
              src={`/portfolio/assets/projects/${nextProjectDetails.img}/logo.png`}
              alt={nextProjectDetails.title}
              className="opacity-0"
            />
          </div>
          <div
            className={`rounded-lg overflow-hidden absolute md:w-1/2 w-3/4 top-0 -z-20 left-1/2 duration-300 -translate-x-1/2 ${
              showNextProjectImg ? "-translate-y-1/4" : "translate-y-0"
            }`}
          >
            <img
              src={`/portfolio/assets/projects/${nextProjectDetails.img}/logo.png`}
              alt={nextProjectDetails.title}
              className="w-full"
            />
          </div>
        </div>
      </section>
    </TransitionOverlay>
  );
}

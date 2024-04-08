import { Link, useLocation, useParams } from "react-router-dom";
import { TransitionOverlay } from "../../Transition/transition";
import { useEffect, useLayoutEffect, useState } from "react";
import { projectsInfos } from "../../ProjectsInfos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  // const [projectIndx, setProjectIndx] = useState(0);

  const minLg = gsap.matchMedia();

  // ANCHOR USELAYOUT EFFECT  ||========================================================================
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
    const projectFilteredArr = projectsInfos.filter(
      ({ title }) =>
        title.toLowerCase().split(" ").join("-") ===
        projectName?.toLowerCase().toLowerCase().split(" ").join("-")
    );
    setProjectDetails(projectFilteredArr[0]);
    // setProjectIndx(projectsInfos.indexOf(projectFilteredArr[0]));
  }, []);

  minLg.add("(min-width: 1024px)", () => {
    const { pathname } = useLocation();
    useEffect(() => {
      const imgArr = document.querySelectorAll<HTMLImageElement>("img");
      const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
      const video = document.querySelector<HTMLVideoElement>("video");
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
    }, [pathname]);
  });

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

      gsap.to(".__parallax-img", {
        scrollTrigger: {
          trigger: ".__parallax-img",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        translateY: "-25%",
      });

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
      <section className="min-h-[100dvh] __section-padding lg:mt-8 mt-0 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4">
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
          className="md:w-[80%] w-full mx-auto lg:mt-12 rounded-md relative"
        />

        {/* ANCHOR RESPONSIVE IMAGES  ||========================================================== */}
        <div className="flex md:flex-row flex-col gap-16 items-start justify-around __parallax-img">
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-1.png`}
            className="w-72 md:translate-y-1/4 mx-auto"
          />
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-2.png`}
            className="w-72 md:translate-y-1/4 mx-auto"
          />
          <img
            src={`/portfolio/assets/projects/${projectDetails.img}/responsive-3.png`}
            className="w-72 md:translate-y-1/4 mx-auto"
          />
        </div>

        <div className="py-12">
          <video
            src={`/portfolio/assets/projects/${projectDetails.img}/sample.mp4`}
            loop
            muted
            playsInline
            autoPlay
            className="h-[35rem] mx-auto"
          />
        </div>
      </section>
    </TransitionOverlay>
  );
}

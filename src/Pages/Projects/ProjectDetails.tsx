import { Link, useParams } from "react-router-dom";
import { TransitionOverlay } from "../../Transition/transition";
import { useEffect, useLayoutEffect, useState } from "react";
import { projectsInfos } from "../../ProjectsInfos";

export default function ProjectDetails() {
  const { name: projectName } = useParams();

  const [projectDetails, setProjectDetails] = useState<{
    readonly title: string;
    readonly img: string;
    readonly desc: string;
    readonly to: string;
    readonly repoClient: string;
    readonly repoServer?: string;
    readonly live?: string;
  }>({
    title: "",
    img: "",
    desc: "",
    to: "",
    repoClient: "",
    repoServer: "",
    live: "",
  });

  // ANCHOR USELAYOUT EFFECT
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
    setProjectDetails(
      projectsInfos.filter(
        ({ title }) =>
          title.toLowerCase().split(" ").join("-") ===
          projectName?.toLowerCase().toLowerCase().split(" ").join("-")
      )[0]
    );
  }, []);

  // ANCHOR USEEFFECT  ||========================================================================
  useEffect(() => {
    document.body.classList.remove("__dark-mode");

    // ANCHOR CURSOR  ||========================================================================
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
          <div className="lg:text-xl lg:leading-[2rem] font-[500] md:text-lg md:leading-[1.5rem] text-base leading-[1.5rem] lg:col-span-8 md:col-span-10 col-span-12 w-fit __cursor-blend __project-desc">
            {projectDetails.desc}
          </div>
        </div>
        <img
          src={`../assets/projects/${projectDetails.img}.png`}
          alt={projectDetails.title}
          className="md:w-[80%] w-full mx-auto lg:mt-12 rounded-md"
        />
        <div className="mx-auto space-y-2">
          <div className="__section-desc">
            Repository link{projectDetails.repoServer && "s"}:
          </div>
          <div className="flex w-full justify-start gap-4 items-center">
            <Link
              to={projectDetails.repoClient}
              className="expand-bg border px-4 py-2 rounded-md lg:text-2xl md:text-xl text-lg"
              onMouseEnter={cursorHoverColorChange}
              onMouseLeave={cursorLeaveColorChange}
            >
              Client
            </Link>
            {projectDetails.repoServer ? (
              <Link
                to={projectDetails.repoServer}
                className="expand-bg border px-4 py-2 rounded-md lg:text-2xl md:text-xl text-lg"
                onMouseEnter={cursorHoverColorChange}
                onMouseLeave={cursorLeaveColorChange}
              >
                Server
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </TransitionOverlay>
  );
}

import { Link, useParams } from "react-router-dom";
import { TransitionOverlay } from "../../Transition/transition";
import { useEffect, useLayoutEffect, useState } from "react";
import { projectsInfos } from "../../ProjectsInfos";
import VBOSS from "/assets/projects/VBOSS.png";

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
    }
  }, []);

  return (
    <TransitionOverlay>
      <section className="min-h-[100dvh] __section-padding lg:mt-8 mt-0">
        <div className="flex justify-between md:items-center sm:flex-row flex-col">
          <span className="__section-title" style={{ margin: 0 }}>
            {projectDetails.title}
          </span>
          {projectDetails.live ? (
            <Link
              to={projectDetails.live}
              target="_blank"
              className="expand-bg border rounded-md __section-desc lg:px-8 md:px-6 px-4 sm:mr-0 mr-auto h-fit my-auto"
            >
              Live Preview
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-12 md:mt-8 mt-4">
          <div className="lg:text-xl lg:leading-[2rem] font-[500] md:text-lg md:leading-[1.5rem] text-base leading-[1.5rem] lg:col-span-8 md:col-span-10 col-span-12">
            {projectDetails.desc}
          </div>
        </div>
        <img
          src={VBOSS}
          alt={projectDetails.title}
          className="md:w-[80%] w-full mx-auto lg:mt-12 md:mt-8 mt-4"
        />
      </section>
    </TransitionOverlay>
  );
}

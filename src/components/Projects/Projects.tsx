import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "./styles.css";
import { projectsInfos } from "../../ProjectsInfos";
import { Link } from "react-router-dom";

export default function Projects() {
  // ANCHOR STATES && REFS
  const [activeProjectIndx, setActiveProjectIndx] = useState(0);
  const [imgScale, setImgScale] = useState(0);
  const [mousePresent, setMousePresent] = useState(false);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const cursorHoverColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "difference";
  };

  const cursorLeaveColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "";
  };

  // ANCHOR EFFECTS
  useEffect(() => {
    const gsapMatchMedia = gsap.matchMedia();

    gsapMatchMedia.add("(min-width: 768px)", () => {
      // Get the __custom-cursor element
      const customCursor = document.querySelector(".__custom-cursor");

      // Get all elements with class name "__project-row"
      const projectRows = Array.from(
        document.querySelectorAll(".__project-row")
      );

      if (customCursor)
        window.addEventListener("scroll", () => {
          const elementsUnderCursor = document.elementsFromPoint(
            customCursor.getBoundingClientRect().x,
            customCursor.getBoundingClientRect().y
          );

          const isHoveringProjectRow = elementsUnderCursor.some((element) => {
            return projectRows.includes(element);
          });

          if (isHoveringProjectRow) {
            setImgScale(1);
            return;
          }
          setImgScale(0);
          return;
        });
    });

    gsapMatchMedia.add("(max-width: 768px)", () => {
      // GSAP ANIMATIONS ||================================================================
      imgRefs.current.forEach((img, index) => {
        gsap.to(img, {
          x: "0%",
          scrollTrigger: {
            trigger: img,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () =>
              gsap.to(titleRefs.current[index], {
                x: "0%",
                ease: "power1.out",
                delay: 0.2,
              }),
            onLeaveBack: () =>
              gsap.to(titleRefs.current[index], {
                x: "100%",
                ease: "power1.out",
              }),
          },
          ease: "power1.out",
        });
      });
    });
  }, []);

  // ANCHOR JSX
  return (
    <section className="__section-padding __theme-change-dark" id="projects">
      <span className="__cursor-blend">
        <span className="__section-title">
          Projects <span className="z-[12]">⚒️</span>
        </span>
      </span>
      {/* ANCHOR LARGE SCREENS */}
      <div className="mt-8 flex-col items-center justify-center overflow-hidden __projects-not-mobile">
        <div
          className="rounded-lg origin-top-left flex-col fixed z-[13] -translate-x-1/2 -translate-y-1/2 w-[34rem] items-center overflow-hidden duration-[600ms] __projects-img-section"
          style={{
            filter: "brightness(70%)",
            transform: `translate(-50%, -50%)`,
            height: `calc(${imgScale} * 19.1rem)`,
            transition: "550ms cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {projectsInfos.slice(0, 4).map(({ img, title }, indx) => (
            <img
              key={indx}
              src={`/portfolio/assets/projects/${img}/logo.png`}
              style={{
                transform: `translateY(${activeProjectIndx * -100}%)`,
                transition: "1300ms cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              alt={title}
            />
          ))}
        </div>
        {projectsInfos.slice(0, 4).map(({ title, to }, indx) => (
          <div
            key={indx}
            className={`__project-row border-t lg:text-5xl duration-300s md:text-4xl text-3xl ${
              mousePresent && indx !== activeProjectIndx
                ? "p-8"
                : !mousePresent
                ? "p-8"
                : "p-12"
            } w-full flex justify-between items-center z-[14] translate-x-full __slide-right-left overflow-hidden ${
              indx + 1 === 4 ? "border-b" : ""
            }`}
            style={{
              borderColor: "var(--text-color)",
              transition: "padding 300ms ease",
            }}
            onMouseEnter={() => {
              setMousePresent(true);
              setActiveProjectIndx(indx);
              setImgScale(1);
              const cursor =
                document.querySelector<HTMLDivElement>(".__custom-cursor");
              if (cursor) cursor.style.zIndex = "15";
            }}
            onMouseLeave={() => {
              setMousePresent(false);
              setImgScale(0);
              const cursor =
                document.querySelector<HTMLDivElement>(".__custom-cursor");
              if (cursor) cursor.style.zIndex = "11";
            }}
            onWheel={() => {
              setActiveProjectIndx(indx);
            }}
          >
            <span
              className={`font-semibold ${
                mousePresent && indx === activeProjectIndx
                  ? ` brightness-100 translate-x-5`
                  : mousePresent
                  ? " brightness-[0.3]"
                  : ""
              } duration-300`}
            >
              {title}
            </span>
            <Link
              to={`projects/${to}`}
              onMouseEnter={cursorHoverColorChange}
              onMouseLeave={cursorLeaveColorChange}
              className={`expand-bg font-light __section-desc px-6 hover:rounded-xl border-2 ${
                mousePresent && indx === activeProjectIndx
                  ? `brightness-100 -translate-x-5`
                  : mousePresent
                  ? "brightness-[0.3]"
                  : ""
              }`}
              style={{
                transition: "transform cubic-bezier(0.19, 1, 0.22, 1), 300ms",
              }}
            >
              view
            </Link>
          </div>
        ))}
      </div>

      {/* ANCHOR not large screens */}
      <div className="mt-4 __projects-mobile">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {projectsInfos.slice(0, 4).map(({ title, img, to }, indx) => (
            <Link
              to={`projects/${to}`}
              className="flex flex-col gap-4"
              key={indx}
            >
              <div className="rounded-lg w-full overflow-hidden inline-block">
                <img
                  src={`/portfolio/assets/projects/${img}/logo.png`}
                  alt={title}
                  className="translate-x-full __project-img-mobile"
                  ref={(el) => (imgRefs.current[indx] = el)}
                />
              </div>
              <div className="overflow-hidden w-fit">
                <button
                  className="md:text-3xl text-2xl flex items-center gap-2 __project-title-mobile translate-x-full"
                  ref={(el) => (titleRefs.current[indx] = el)}
                >
                  {title}
                  <span className="material-symbols-outlined md:text-2xl text-xl">
                    open_in_new
                  </span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:mt-12 md:mt-8 mt-4 flex w-full justify-end items-center">
        <Link
          to={"projects"}
          className="rounded-lg __section-desc border-2 md:px-10 px-4 py-2 expand-bg"
          onMouseEnter={cursorHoverColorChange}
          onMouseLeave={cursorLeaveColorChange}
        >
          All projects
        </Link>
      </div>
    </section>
  );
}

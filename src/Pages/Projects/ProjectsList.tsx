import { useEffect, useRef, useState } from "react";
import { projectsInfos } from "../../ProjectsInfos";
import { TransitionOverlay } from "../../Transition/transition";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProjectsList() {
  // ANCHOR STATES && REFS  ||====================||====================
  const [activeProjectIndx, setActiveProjectIndx] = useState(0);
  const [imgScale, setImgScale] = useState(0);
  const [mousePresent, setMousePresent] = useState(false);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // ANCHOR FUNCTIONS/METHODS  ||====================||====================
  const cursorHoverColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "difference";
  };

  const cursorLeaveColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "";
  };

  // ANCHOR EFFECTS  ||====================||====================
  useEffect(() => {
    document.body.classList.add("__dark-mode");
    const gsapMatchMedia = gsap.matchMedia();

    gsapMatchMedia.add("(min-width:1024px)", () => {
      gsap.to(".__slide-right-left", {
        x: "0%",
        ease: "expo.out",
        stagger: 0.2,
        duration: 1,
        delay: 0.5,
      });
      // Get the __custom-cursor element
      const customCursor = document.querySelector(".__custom-cursor");

      // Get all elements with class name "__project-row"
      const projectRows = Array.from(
        document.querySelectorAll(".__project-row"),
      );

      if (customCursor)
        window.addEventListener("scroll", () => {
          const elementsUnderCursor = document.elementsFromPoint(
            customCursor.getBoundingClientRect().x,
            customCursor.getBoundingClientRect().y,
          );

          const isHoveringProjectRow = elementsUnderCursor.some((element) => {
            const isPresent = projectRows.includes(element);
            if (isPresent) {
              const parentElement = element.parentNode as ParentNode;
              const children = Array.from(parentElement.children);
              const childIndex = children.indexOf(element);
              setActiveProjectIndx(childIndex - 1);
              setMousePresent(true);
            } else {
              setMousePresent(false);
            }
            return isPresent;
          });

          if (isHoveringProjectRow) {
            const cursor =
              document.querySelector<HTMLDivElement>(".__custom-cursor");
            if (cursor) {
              cursor.style.zIndex = "15";
              cursor.style.scale = "1";
              cursor.style.mixBlendMode = "normal";
            }
            setImgScale(1);
            return;
          }
          const cursor =
            document.querySelector<HTMLDivElement>(".__custom-cursor");
          if (cursor && mousePresent)
            setTimeout(() => {
              cursor.style.zIndex = "11";
            }, 400);
          setImgScale(0);
          return;
        });
    });

    gsapMatchMedia.add("(max-width: 1024px)", () => {
      imgRefs.current.forEach((img) => {
        gsap.to(img, {
          x: "0%",
          ease: "power1.out",
        });
      });
      titleRefs.current.forEach((title) => {
        gsap.to(title, {
          x: "0%",
          ease: "power1.out",
          delay: 0.3,
        });
      });
    });

    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    const textBlendElements =
      document.querySelectorAll<HTMLElement>(".__cursor-blend");
    if (cursorElement) {
      cursorElement.style.mixBlendMode = "";
      cursorElement.style.scale = "1";
    }

    textBlendElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      textBlendElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      ScrollTrigger.killAll();
      document.body.classList.remove("__dark-mode");
    };
  }, []);

  // ANCHOR FUNCTIONS  ||========================================================================
  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";

      cursorElement.style.mixBlendMode = "";
      cursorElement.style.backgroundColor = "var(--text-color)";
    }
  };

  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";

      cursorElement.style.backgroundColor = "#E7E5E4";
      cursorElement.style.mixBlendMode = "difference";
    }
  };

  // ANCHOR JSX  ||====================||====================
  return (
    <TransitionOverlay>
      <>
        <section className="__theme-change-dark __section-padding">
          {/* ANCHOR LARGE SCREENS */}
          <div className="lg:text-6xl md:text-5xl text-4xl pb-1 font-bold overflow-hidden inline-block">
            All Projects ⚒️
          </div>
          <div
            className="mt-6 flex-col items-center justify-center overflow-hidden __projects-not-mobile"
            onMouseEnter={() => {
              const cursor =
                document.querySelector<HTMLDivElement>(".__custom-cursor");
              if (cursor) cursor.style.zIndex = "15";
            }}
            onMouseMove={() => {
              const cursor =
                document.querySelector<HTMLDivElement>(".__custom-cursor");
              if (cursor) cursor.style.zIndex = "15";
            }}
            onMouseLeave={() => {
              const cursor =
                document.querySelector<HTMLDivElement>(".__custom-cursor");
              if (cursor && mousePresent)
                setTimeout(() => {
                  cursor.style.zIndex = "11";
                }, 400);
            }}
          >
            <div
              className="rounded-lg origin-top-left flex-col fixed z-[13] -translate-x-1/2 -translate-y-1/2 w-[34rem] items-center overflow-hidden duration-[600ms] __projects-img-section"
              style={{
                filter: "brightness(70%)",
                transform: `translate(-50%, -50%)`,
                height: `calc(${imgScale} * 19.1rem)`,
                transition: "550ms cubic-bezier(0.76, 0, 0.24, 1)",
              }}
            >
              {projectsInfos.map(({ img, title }, indx) => (
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
            {projectsInfos.map(({ title, to }, indx) => (
              <div
                key={indx}
                className={`border-t lg:text-4xl duration-300s md:text-3xl text-2xl p-6 w-full flex justify-between items-center z-[14] translate-x-full __slide-right-left overflow-hidden ${
                  indx + 1 === projectsInfos.length ? "border-b" : ""
                } __project-row`}
                style={{
                  borderColor: "var(--text-color)",
                  transition: "padding 300ms ease",
                }}
                onMouseEnter={() => {
                  setMousePresent(true);
                  setActiveProjectIndx(indx);
                  setImgScale(1);
                }}
                onMouseLeave={() => {
                  setMousePresent(false);
                  setImgScale(0);
                }}
              >
                <span
                  className={`${
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
                  to={to}
                  onMouseEnter={cursorHoverColorChange}
                  onMouseLeave={cursorLeaveColorChange}
                  className={`expand-bg font-light md:text-2xl duration-300s px-4 py-2 hover:rounded-md border ${
                    mousePresent && indx === activeProjectIndx
                      ? `brightness-100 -translate-x-5`
                      : mousePresent
                        ? "brightness-[0.3]"
                        : ""
                  }`}
                  style={{
                    transition:
                      "transform cubic-bezier(0.19, 1, 0.22, 1), 300ms",
                  }}
                >
                  view
                </Link>
              </div>
            ))}
          </div>
          {/* ANCHOR not large screens */}
          <div className="mt-4 __projects-mobile">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-8">
              {projectsInfos.map(({ title, img, to }, indx) => (
                <Link
                  to={`/portfolio/projects/${to}`}
                  className="flex flex-col gap-2"
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
                      className="flex text-lg items-center justify-start gap-2 __project-title-mobile translate-x-full"
                      ref={(el) => (titleRefs.current[indx] = el)}
                    >
                      {title}
                      <span className="material-symbols-outlined text-base">
                        open_in_new
                      </span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </>
    </TransitionOverlay>
  );
}

import { useState } from "react";

export default function Projects() {
  const [activeProjectIndx, setActiveProjectIndx] = useState(0);
  const [imgScale, setImgScale] = useState(0);
  const [mousePresent, setMousePresent] = useState(false);

  const details: { title: string; img: string }[] = [
    {
      title: "VBOSS",
      img: "VBOSS",
    },
    {
      title: "FlikiPedia",
      img: "Flikipedia",
    },
    {
      title: "Wok of Fame",
      img: "Wok of Fame",
    },
    {
      title: "React Carousel",
      img: "Carousel",
    },
  ];

  const cursorHoverColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "difference";
  };

  const cursorLeaveColorChange = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.style.mixBlendMode = "";
  };

  return (
    <section className="__section-padding __theme-change-dark" id="projects">
      <span className="__cursor-blend">
        <span className="__section-title">
          Projects <span className="z-[12]">⚒️</span>
        </span>
      </span>

      <div className="mt-8 lg:flex hidden flex-col items-center justify-center overflow-hidden">
        <div
          className="rounded-lg origin-top-left flex-col fixed z-[13] -translate-x-1/2 -translate-y-1/2 w-[34rem] items-center overflow-hidden duration-[600ms] __projects-img-section"
          style={{
            filter: "brightness(70%)",
            transform: `translate(-50%, -50%)`,
            height: `calc(${imgScale} * 19.1rem)`,
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {details.map(({ img, title }, indx) => (
            <img
              key={indx}
              src={`assets/projects/${img}.png`}
              style={{
                transform: `translateY(${activeProjectIndx * -100}%)`,
                transition: "1300ms cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              alt={title}
            />
          ))}
        </div>
        {details.map(({ title }, indx) => (
          <div
            key={indx}
            className={`border-t lg:text-5xl duration-300s md:text-4xl text-3xl ${
              mousePresent && indx !== activeProjectIndx
                ? "p-8"
                : !mousePresent
                ? "p-8"
                : "p-12"
            } w-full flex justify-between items-center z-[14] translate-x-full __slide-right-left overflow-hidden ${
              indx + 1 === details.length ? "border-b" : ""
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
            <button
              onMouseEnter={cursorHoverColorChange}
              onMouseLeave={cursorLeaveColorChange}
              className={`expand-bg font-light __section-desc px-6 hover:rounded-xl border ${
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
            </button>
          </div>
        ))}
      </div>

      <div className="flex lg:hidden mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {details.map(({ title, img }, indx) => (
            <div className="flex flex-col gap-4" key={indx}>
              <img
                src={`assets/projects/${img}.png`}
                alt={title}
                className="rounded-lg w-full __project-img"
              />
              <button className="md:text-3xl text-2xl flex items-center gap-2">
                {title}
                <span className="material-symbols-outlined md:text-2xl text-xl">
                  open_in_new
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:mt-12 md:mt-8 mt-4 flex w-full justify-end items-center">
        <button
          className="rounded-lg __section-desc border md:px-10 px-4 py-2 expand-bg"
          onMouseEnter={cursorHoverColorChange}
          onMouseLeave={cursorLeaveColorChange}
        >
          All projects
        </button>
      </div>
    </section>
  );
}

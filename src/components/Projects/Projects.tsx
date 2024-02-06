import { useState } from "react";
import Carousel from "/assets/projects/Carousel.png";
import Flikipedia from "/assets/projects/Flikipedia.png";
import WokofFame from "/assets/projects/Wok of Fame.png";
import VBOSS from "/assets/projects/VBOSS.png";

export default function Projects() {
  const [activeProjectIndx, setActiveProjectIndx] = useState(0);
  const [imgScale, setImgScale] = useState(0);
  const [mousePresent, setMousePresent] = useState(false);

  const details: { title: string; img: string }[] = [
    {
      title: "VBOSS",
      img: VBOSS,
    },
    {
      title: "FlikiPedia",
      img: Flikipedia,
    },
    {
      title: "Wok of Fame",
      img: WokofFame,
    },
    {
      title: "React Carousel",
      img: Carousel,
    },
  ];

  return (
    <section className="__section-padding __theme-change-dark">
      <span className="__cursor-blend">
        <span className="__section-title">
          Projects <span className="z-[12]">⚒️</span>
        </span>
      </span>

      <div className="mt-8 flex flex-col items-center justify-center">
        <div
          className="lg:flex hidden flex-col fixed z-[13] -translate-x-1/2 -translate-y-1/2 w-[34rem] items-center overflow-hidden h-[19.1rem] duration-300 __projects-img-section"
          style={{
            filter: "brightness(70%)",
            transform: `scale(${imgScale}) translate(-50%, -50%)`,
            transformOrigin: "left left",
          }}
        >
          {details.map(({ img }, indx) => (
            <img
              key={indx}
              src={img}
              style={{
                transform: `translateY(${activeProjectIndx * -100}%)`,
                transition: "500ms",
              }}
            />
          ))}
        </div>
        {details.map(({ title }, indx) => (
          <div
            key={indx}
            className={`border-t lg:text-5xl md:text-4xl text-3xl p-9 w-full flex justify-between items-center px-12 z-[14] ${
              indx + 1 === details.length ? "border-b" : ""
            }`}
            style={{
              borderColor: "var(--text-color)",
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
              onMouseEnter={() => {
                const cursor =
                  document.querySelector<HTMLDivElement>(".__custom-sursor");
                if (cursor) cursor.style.mixBlendMode = "difference";
              }}
              onMouseLeave={() => {
                const cursor =
                  document.querySelector<HTMLDivElement>(".__custom-sursor");
                if (cursor) cursor.style.mixBlendMode = "";
              }}
              className={`expand-bg font-light __section-desc px-6 hover:rounded-lg duration-300 border ${
                mousePresent && indx === activeProjectIndx
                  ? `brightness-100 -translate-x-5`
                  : mousePresent
                  ? "brightness-[0.3]"
                  : ""
              }`}
              style={{
                transition: "300ms",
              }}
            >
              view
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

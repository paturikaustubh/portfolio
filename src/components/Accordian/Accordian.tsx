import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Accordion({
  activeIndx,
  setActiveIndx,
  indx,
  title,
  description,
  borderB = false,
}: {
  activeIndx: number;
  setActiveIndx: React.Dispatch<React.SetStateAction<number>>;
  indx: number;
  title: string;
  description: string;
  borderB?: boolean;
}) {
  useEffect(() => {
    const rightLeftEles = document.querySelectorAll(".__slide-right-left");
    rightLeftEles.forEach((ele) => {
      gsap.from(ele, {
        scrollTrigger: {
          trigger: ele,
          start: "top 70%",
          // end: "bottom 50%",
          scrub: false,
          // markers: true,
          // toggleActions: "play none none none",
        },
        x: "100%",
        stagger: 0.02,
        duration: 0.3,
      });
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        className={`tech-stack-info-card border-t __slide-right-left ${
          borderB ? "border-b" : ""
        } ${activeIndx === indx ? "active rounded-lg" : ""}`}
        onMouseMove={() => {
          const cursor =
            document.querySelector<HTMLElement>(".__custom-cursor");
          if (cursor && activeIndx === indx) {
            cursor.style.backgroundColor = "var(--bg-color)";
          } else if (cursor && activeIndx !== indx) {
            cursor.style.backgroundColor = "var(--text-color)";
          }
        }}
        onMouseLeave={() => {
          const cursor =
            document.querySelector<HTMLElement>(".__custom-cursor");
          if (cursor && activeIndx === indx) {
            cursor.style.backgroundColor = "var(--text-color)";
          }
        }}
      >
        <button
          className="tech-stack-info-title flex justify-between text-4xl items-center w-full font-semibold p-5"
          onClick={() => {
            setActiveIndx((prevVal: number) => {
              if (prevVal !== indx) return indx;
              return 0;
            });
            const cursor =
              document.querySelector<HTMLElement>(".__custom-cursor");
            if (cursor) {
              const currentBgColor = cursor.style.backgroundColor;
              if (currentBgColor === "var(--text-color)")
                cursor.style.backgroundColor = "var(--bg-color)";
              else cursor.style.backgroundColor = "var(--text-color)";
            }
          }}
        >
          <span>{title}</span>
          <span>
            <svg
              className="shrink-0 ml-8 accordion-expand-indicator"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center ${
                  activeIndx === indx ? "rotate-180" : "rotate-0"
                } transition duration-700 ease-out`}
              ></rect>
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center ${
                  activeIndx === indx ? "rotate-0" : "-rotate-[270deg]"
                } transition duration-700 ease-out`}
              ></rect>
            </svg>
          </span>
        </button>
        <div
          className={`grid duration-300 ease-in-out ${
            activeIndx === indx
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="text-lg pb-5 px-5">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

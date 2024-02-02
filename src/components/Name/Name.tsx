import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { TargetElement } from "split-type";

gsap.registerPlugin(ScrollTrigger);

import "./styles.css";

export default function Name() {
  useEffect(() => {
    const textDropSplits = document.querySelectorAll(".__animate-full-name");
    textDropSplits.forEach((char) => {
      const { chars } = new SplitType(char as TargetElement, {
        types: "chars",
      });

      gsap.from(chars, {
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          end: "bottom 40%",
        },
        y: "100%",
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
        ease: "back.out",
      });
    });

    const textFadeSplits = document.querySelectorAll(".__animate-profession");
    textFadeSplits.forEach((char) => {
      const { chars } = new SplitType(char as TargetElement, {
        types: "chars",
      });

      gsap.from(chars, {
        scrollTrigger: {
          trigger: char,
          // scrub: true,
          start: "top 80%",
          end: "bottom 40%",
        },
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
        delay: 0.5,
      });
    });
  }, []);
  return (
    <section className="overflow-hidden relative h-screen p-5 my-10 md:mb-0 flex flex-col justify-center items-center lg:gap-6 md:gap-14 gap-12 bg-transparent select-none">
      <svg
        width="1186"
        height="1186"
        viewBox="0 0 1186 1186"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-5/6 sm:w-3/5 lg:w-2/5 pointer-events-none -z-20 opacity-100 scale-100"
      >
        <circle
          cx="593"
          cy="593"
          r="593"
          fill="url(#paint0_linear_4949_267)"
        ></circle>
        <defs>
          <linearGradient
            id="paint0_linear_4949_267"
            x1="593"
            y1="0"
            x2="593"
            y2="1186"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#DDDDD5"></stop>
            <stop offset="1" stopColor="#DDDDD5" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div
        id="full-name"
        className="flex gap-4 mx-4 justify-center items-center whitespace-nowrap flex-wrap lg:text-9xl md:text-8xl text-6xl flex-col font-bold __animate-full-name __cursor-blend"
      >
        <span className="overflow-hidden">KAUSTUBH</span>
        <span className="__stroke-only overflow-hidden">PATURI</span>
      </div>
      <div
        id="profession"
        className="lg:text-4xl md:text-2xl text-xl __animate-profession font-light __cursor-blend pt-8"
      >
        <span>Full Stack Developer</span>
      </div>
    </section>
  );
}

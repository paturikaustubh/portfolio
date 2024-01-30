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
          // scrub: true,
          start: "top 80%",
          end: "bottom 40%",
          // markers: true,
        },
        scaleY: 0,
        y: -10,
        // delay: 1,
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
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
          // markers: true,
        },
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
        delay: 0.5,
      });
    });
  }, []);
  return (
    <div className="overflow-hidden relative h-screen p-5 flex flex-col justify-center items-center gap-20 bg-transparent select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        x="0px"
        y="0px"
        viewBox="0 0 100 125"
        enableBackground="new 0 0 100 100"
        className="absolute inset-0 m-auto lg:scale-[0.3] md:scale-50 scale-75 -z-10 fill-amber-700-translate-y-1/s4"
      >
        <path
          className="fill-[#aba59a]"
          d="M53.333,36.667V70H10v20h80V36.667H53.333z"
        />
        <path
          className="fill-[#CCC8C0]"
          d="M10,10v53.333h36.667V30H90V10H10z"
        />
      </svg>
      <section
        id="full-name"
        className="flex gap-4 justify-center items-center lg:text-9xl text-7xl md:flex-row flex-col font-semibold __animate-full-name __element-text __cursor-blend"
        data-element-text-info={`<section id = "full-name">`}
      >
        <span>Kaustubh</span>
        <span className="__stroke-only">Paturi</span>
      </section>
      <section
        id="profession"
        className="lg:text-4xl md:text-2xl text-xl __animate-profession font-light __cursor-blend"
        data-element-text-info={'<section id="profession">'}
      >
        <span>Full Stack Developer</span>
      </section>
    </div>
  );
}

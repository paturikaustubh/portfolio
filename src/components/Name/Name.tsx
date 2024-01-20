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
      });
    });
  }, []);
  return (
    <div className="overflow-hidden h-screen p-5 flex flex-col justify-center items-center gap-20 bg-transparent select-none">
      <section
        id="full-name"
        className="flex gap-4 justify-center items-center lg:text-9xl md:text-7xl text-5xl font-semibold __animate-full-name __element-text __cursor-blend"
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

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { TargetElement } from "split-type";

gsap.registerPlugin(ScrollTrigger);

import "./styles.css";

export default function Name() {
  useEffect(() => {
    const textDropSplits = document.querySelectorAll(".__animate-text-drop");
    textDropSplits.forEach((char) => {
      const { chars } = new SplitType(char as TargetElement, {
        types: "chars",
      });

      gsap.from(chars, {
        scrollTrigger: {
          trigger: char,
          scrub: false,
        },
        scaleY: 0,
        y: -10,
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
      });
    });

    const textFadeSplits = document.querySelectorAll(".__animate-text-fade");
    textFadeSplits.forEach((char) => {
      const { chars } = new SplitType(char as TargetElement, {
        types: "chars",
      });

      gsap.from(chars, {
        scrollTrigger: {
          trigger: char,
          scrub: false,
        },
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
      });
    });
  }, []);
  return (
    <div className="overflow-hidden h-screen flex flex-col justify-center items-center gap-20 bg-transparent">
      <section
        id="full-name"
        className="flex gap-4 justify-center items-center lg:text-9xl md:text-7xl text-5xl font-semibold __animate-text-drop __element-text"
        data-element-text-info={`<section id = "full-name">`}
      >
        <span>Kaustubh</span>
        <span className="__stroke-only">Paturi</span>
      </section>
      <section
        id="profession"
        className=" text-4xl __element-text __animate-text-fade"
        data-element-text-info={'<section id="profession">'}
      >
        <span>Full Stack Developer</span>
      </section>
    </div>
  );
}

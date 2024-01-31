import { useEffect } from "react";

import { gsap } from "gsap";
import SplitType, { TargetElement } from "split-type";

import "./styles.css";

export default function Summary() {
  useEffect(() => {
    const fadeInText = document.querySelectorAll(".__fade-in");
    fadeInText.forEach((char) => {
      const { words } = new SplitType(char as TargetElement, {
        types: "words",
      });

      gsap.from(words, {
        scrollTrigger: {
          trigger: char,
          scrub: 1,
          start: "top 70%",
          end: "bottom 20%",
        },
        opacity: 0.03,
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <section
      className="overflow-hidden h-fit __section-padding flex flex-col justify-start items-start gap-20 bg-transparent select-none __theme-change-dark"
      id="about-me"
    >
      <div id="summary" className="lg:w-3/4 w-full __cursor-blend">
        <h1 className="__section-title">About Me</h1>
        <span className="__fade-in h-full text-justify lg:text-5xl lg:leading-[4rem] md:text-4xl md:leading-[3.5rem] text-3xl leading-[3rem]">
          A versatile Full-Stack Developer passionately dedicated to craft
          user-centric digital experiences while solving business challenges
          with innovation.
        </span>
      </div>
    </section>
  );
}

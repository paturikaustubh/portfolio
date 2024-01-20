import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
          start: "top 80%",
          end: "bottom 20%",
        },
        opacity: 0.03,
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <div className="overflow-hidden md:h-screen h-fit p-5 flex flex-col justify-start translate-y-20 items-start gap-20 bg-transparent select-none __theme-change-dark">
      <section
        id="summary"
        className="md:w-3/4 w-full lg:text-6xl md:text-4xl text-2xl __cursor-blend __fade-in font-[700] lg:leading-[6rem] md:leading-[4rem] leading-[3rem]"
      >
        <span>
          I'm a versatile Full Stack Developer passionately dedicated to
          crafting user-centric digital experiences while solving business
          challenges with innovation.
        </span>
      </section>
    </div>
  );
}

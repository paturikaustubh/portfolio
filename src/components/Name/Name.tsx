import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { TargetElement } from "split-type";

gsap.registerPlugin(ScrollTrigger);

import "./styles.css";

export default function Name() {
  // ANCHOR EFFECTS  ||========================================================================
  useEffect(() => {
    // ANCHOR NAME ANIMATION  ||========================================================================
    const textDropSplits = document.querySelectorAll(".__animate-full-name");
    textDropSplits.forEach((char) => {
      const { chars: nameChars } = new SplitType(char as TargetElement, {
        types: "chars",
      });

      gsap.from(nameChars, {
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          end: "bottom 40%",
        },
        y: "100%",
        // opacity: 0,
        transformOrigin: "left left",
        stagger: 0.04,
        ease: "back.out",
        delay: 0.8,
        duration: 0.35,
      });
    });

    // ANCHOR NAME BG ANIMATION  ||========================================================================
    const { chars: bgChars } = new SplitType(".__name-bg", { types: "chars" });
    gsap.to(bgChars, {
      opacity: 1,
      textShadow: "13px 5px 20px rgba(0 0 0 / 0.07)",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.13,
      delay: 1.3,
      // backgroundColor: "var(--bg-color)",
    });

    // ANCHOR PROFESSION ANIMATION  ||========================================================================
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
        delay: 1.5,
      });
    });
  }, []);

  // ANCHOR JSX  ||========================================================================
  return (
    <section className="overflow-hidden relative h-screen __section-padding flex flex-col justify-center items-center lg:gap-6 md:gap-14 gap-12 bg-transparent select-none">
      <div className="absolute w-full h-full flex justify-center items-center pointer-events-none __name-bg">
        hey!
      </div>
      <div className="flex flex-col justify-center items-center poin __sticky-situation">
        <div
          id="full-name"
          className="flex gap-4 mx-4 py-1 overflow-hidden justify-center items-center whitespace-nowrap flex-wrap lg:text-[10em] sm:text-9xl text-6xl font-bold __name-span __animate-full-name __cursor-blend"
        >
          <span className="overflow-hidden">KAUSTUBH</span>
          <span className="__stroke-only overflow-hidden">PATURI</span>
        </div>
        <div
          id="profession"
          className="lg:text-4xl md:text-2xl text-xl __animate-profession font-light __cursor-blend lg:mt-8 md:mt-4 mt-2"
        >
          <span className="__accent-text">Full Stack Developer</span>
        </div>
      </div>
    </section>
  );
}

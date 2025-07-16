import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { TargetElement } from "split-type";

gsap.registerPlugin(ScrollTrigger);

import "./styles.css";

export default function Name() {
  // ANCHOR EFFECTS  ||========================================================================
  useEffect(() => {
    const gsapMatchMedia = gsap.matchMedia();
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
        delay: 0.6,
        duration: 0.4,
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
      delay: 1.8,
      // backgroundColor: "var(--bg-color)",
    });

    // ANCHOR PROFESSION ANIMATION  ||========================================================================
    const textFadeSplits = document.querySelectorAll(".__animate-profession");
    gsapMatchMedia.add("(min-width: 768px)", () => {
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
          filter: "blur(8px)",
          transformOrigin: "left left",
          scaleY: 1.2,
          stagger: 0.02,
          delay: 1.3,
        });
      });
    });

    gsapMatchMedia.add("(max-width: 768px)", () => {
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
          scaleY: 1.2,
          stagger: 0.02,
          delay: 1.3,
        });
      });
    });
  }, []);

  // ANCHOR JSX  ||========================================================================
  return (
    <section className="relative flex flex-col items-center justify-center h-screen gap-12 overflow-hidden bg-transparent select-none __section-padding lg:gap-6 md:gap-14">
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none __name-bg">
        hey!
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          id="full-name"
          className="flex flex-wrap items-center justify-center gap-4 overflow-hidden font-bold whitespace-nowrap __name-span __animate-full-name __cursor-blend"
        >
          <span className="overflow-hidden">KAUSTUBH</span>
          <span className="overflow-hidden __stroke-only">PATURI</span>
        </div>
        <div
          id="profession"
          className="mt-2 text-xl font-light lg:text-4xl md:text-2xl __animate-profession __cursor-blend"
        >
          <span className="__accent-text">Application Developer</span>
        </div>
      </div>
    </section>
  );
}

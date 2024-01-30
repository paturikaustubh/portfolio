import { useEffect } from "react";

import { gsap } from "gsap";
import SplitType, { TargetElement } from "split-type";

import "./styles.css";

export default function Summary() {
  useEffect(() => {
    const fadeInText = document.querySelectorAll(".__fade-in");
    fadeInText.forEach((char) => {
      console.log(char, "char");
      const { words } = new SplitType(char as TargetElement, {
        types: "words",
      });
      console.log(words, "words");

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

    // const moveRightDown = document.querySelector(".__move-right-down");
    // gsap.to(moveRightDown, {
    //   scrollTrigger: {
    //     trigger: moveRightDown,
    //     scrub: 1,
    //     start: "top 70%",
    //     end: "bottom 20%",
    //   },
    //   x: 300,
    //   y: 300,
    //   stagger: 0.02,
    // });
  }, []);

  return (
    <div className="overflow-hidden h-fit p-5 flex flex-col justify-start translate-y-20 items-start gap-20 bg-transparent select-none __theme-change-dark">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 40"
        x="0px"
        y="0px"
        className="absolute inset-0 m-auto translate-y-[7%] translate-x-1/3 scale-[0.28] opacity-100 fill-[#CCC8C0] __move-right-down"
      >
        <path d="M26.53,10.15a1,1,0,0,0-1,0L17,14.38V11.86a4,4,0,1,0-2,0v3.52l-8,4V12.62l3.55,1.77a1,1,0,0,0,.9-1.78l-5-2.5A1,1,0,0,0,5,11V21a1,1,0,0,0,.47.85A1,1,0,0,0,6,22a1,1,0,0,0,.45-.11L15,17.62v2.52a4,4,0,1,0,2,0V16.62l8-4v6.76l-3.55-1.77a1,1,0,1,0-.9,1.78l5,2.5A1,1,0,0,0,26,22a1,1,0,0,0,.53-.15A1,1,0,0,0,27,21V11A1,1,0,0,0,26.53,10.15Z" />
      </svg> */}
      <section
        id="summary"
        className="md:w-3/4 w-full lg:text-6xl md:text-4xl text-2xl __cursor-blend font-[600] lg:leading-[6rem] md:leading-[4rem] leading-[3rem]"
      >
        <span className="__fade-in h-full">
          I'm a versatile Full Stack Developer passionately dedicated to craft
          user-centric digital experiences while solving business challenges
          with innovation.
        </span>
      </section>
    </div>
  );
}

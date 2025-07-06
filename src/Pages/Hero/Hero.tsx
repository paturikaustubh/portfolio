import { useEffect } from "react";
import Name from "../../components/Name/Name";
import Projects from "../../components/HeroProjects/HeroProjects";
import Skills from "../../components/Skills/Skills";
import Summary from "../../components/Summary/Summary";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "./styles.css";
import SplitType, { TargetElement } from "split-type";
import { TransitionOverlay } from "../../Transition/transition";

export default function Hero() {
  // ANCHOR content animations  ||========================================================================
  useEffect(() => {
    const gsapMatchMedia = gsap.matchMedia();
    const body = document.body;

    if (body.classList.contains("__dark-mode"))
      body.classList.remove("__dark-mode");

    // gsapMatchMedia.add("(max-width: 1024px)", () => {});

    // ANCHOR NAVBAR ANIMATION  ||========================================================================
    gsap.fromTo(
      "nav",
      {
        y: "-100%",
        stagger: 0.02,
      },
      {
        y: 0,
        delay: 1.5,
        duration: 0.8,
      }
    );

    // ANCHOR SECTION TITLE ANIMATION  ||========================================================================
    const sectionTitles = document.querySelectorAll(".__section-title");
    const fadeInText = document.querySelectorAll(".__fade-in");
    const darkThemeElements = document.querySelectorAll(".__theme-change-dark");
    const textBlendElements =
      document.querySelectorAll<HTMLElement>(".__cursor-blend");

    // ANCHOR LARGE SCREEN ANIMS  ||========================================================================
    gsapMatchMedia.add("(min-width: 768px)", () => {
      // ANCHOR CURSOR SIZING  ||========================================================================
      textBlendElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });

      darkThemeElements.forEach((darkElement) => {
        gsap.to("nav", {
          scrollTrigger: {
            trigger: darkElement,
            start: "top 5rem",
            end: "bottom 5rem",
            onEnter: () => {
              document.querySelector("nav")?.classList.add("__header-inverted");
            },
            onEnterBack: () => {
              document.querySelector("nav")?.classList.add("__header-inverted");
            },
            onLeave: () => {
              document
                .querySelector("nav")
                ?.classList.remove("__header-inverted");
            },
            onLeaveBack: () => {
              document
                .querySelector("nav")
                ?.classList.remove("__header-inverted");
            },
          },
        });
      });

      
      sectionTitles.forEach((sectionTitle) => {
        const { chars } = new SplitType(sectionTitle as TargetElement, {
          types: "chars",
        });
        gsap.from(chars, {
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play none none none",
          },
          rotateY: "90deg",
          transformOrigin: "left left",
          stagger: 0.02,
          ease: "bounce.out",
          duration: 0.8,
          letterSpacing: "-15px",
        });
      });

      fadeInText.forEach((char) => {
        const { words } = new SplitType(char as TargetElement, {
          types: "words",
        });
        gsap.from(words, {
          scrollTrigger: {
            trigger: words,
            scrub: 1,
            start: "top 90%",
            end: "bottom 65%",
            toggleActions: "play none none reverse",
          },
          opacity: 0.03,
          filter: "blur(8px)",
          stagger: 0.04,
          duration: 1,
        });
      });
    });

    // ANCHOR SMALL SCREEN ANIMS  ||========================================================================
    gsapMatchMedia.add("(max-width: 768px)", () => {
      sectionTitles.forEach((sectionTitle) => {
        const { chars } = new SplitType(sectionTitle as TargetElement, {
          types: "chars",
        });
        gsap.from(chars, {
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top 90%",
            end: "bottom 40%",
            toggleActions: "play none none none",
          },
          rotateY: "90deg",
          transformOrigin: "left left",
          stagger: 0.02,
          ease: "bounce.out",
          duration: 0.8,
          letterSpacing: "-15px",
        });
      });

      fadeInText.forEach((char) => {
        const { words } = new SplitType(char as TargetElement, {
          types: "words",
        });
        gsap.from(words, {
          scrollTrigger: {
            trigger: char,
            scrub: false,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0.03,
          stagger: 0.02,
          duration: 0.5,
        });
      });
    });

    return () => {
      ScrollTrigger.killAll();
      textBlendElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // ANCHOR FUNCTIONS  ||========================================================================
  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";
      cursorElement.style.mixBlendMode = "difference";
      cursorElement.style.backgroundColor = "#E7E5E4";
    }
  };

  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";
      cursorElement.style.zIndex = "11";
      cursorElement.style.mixBlendMode = "unset";
      cursorElement.style.backgroundColor = "";
    }
  };

  // ANCHOR JSX  ||========================================================================
  return (
    <>
      <TransitionOverlay>
        <>
          <Name />
          <Summary />
          <Skills />
          <Projects />
        </>
      </TransitionOverlay>
    </>
  );
}

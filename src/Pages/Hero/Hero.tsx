import { useEffect } from "react";
import Name from "../../components/Name/Name";
import Projects from "../../components/Projects/Projects";
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

    // gsapMatchMedia.add("(max-width: 1024px)", () => {});

    window.scrollTo({ top: 0 });

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

      // ANCHOR RIGHT TO LEFT SLIDERS  ||========================================================================
      gsap.utils.toArray(".__slide-right-left").forEach((element) => {
        gsap.to(element as Element, {
          x: "0%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: element as Element,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        });
      });
      // ANCHOR MODE/THEME CHANGER  ||========================================================================
      darkThemeElements.forEach((darkElement, indx) => {
        gsap.to("body", {
          scrollTrigger: {
            trigger: darkElement,
            start: "top 80%",
            end: "bottom 70%",
            onEnter: () => {
              document.body.classList.add("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
            },
            onEnterBack: () => {
              document.body.classList.add("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
            },
            onLeave: () => {
              if (indx !== darkThemeElements.length - 1) {
                document.body.classList.remove("__dark-mode");
                document.body.style.transition = "300ms ease-in-out";
              }
            },
            onLeaveBack: () => {
              document.body.classList.remove("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
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
            trigger: char,
            scrub: 1,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 0.03,
          filter: "blur(8px)",
          // scale: 1.5,
          stagger: 0.02,
          duration: 1,
        });
      });
    });

    // ANCHOR SMALL SCREEN ANIMS  ||========================================================================
    gsapMatchMedia.add("(max-width: 768px)", () => {
      // ANCHOR RIGHT TO LEFT SLIDERS  ||========================================================================
      gsap.utils.toArray(".__slide-right-left").forEach((element) => {
        gsap.to(element as Element, {
          x: "0%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: element as Element,
            start: "top 90%",
            end: "bottom 50%",
            toggleActions: "play none none none",
          },
        });
      });
      darkThemeElements.forEach((darkElement, indx) => {
        gsap.to("body", {
          scrollTrigger: {
            trigger: darkElement,
            start: "top 90%",
            end: "bottom 75%",
            onEnter: () => {
              document.body.classList.add("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
            },
            onEnterBack: () => {
              document.body.classList.add("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
            },
            onLeave: () => {
              if (indx !== darkThemeElements.length - 1) {
                document.body.classList.remove("__dark-mode");
                document.body.style.transition = "300ms ease-in-out";
              }
            },
            onLeaveBack: () => {
              document.body.classList.remove("__dark-mode");
              document.body.style.transition = "300ms ease-in-out";
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
            start: "top 90%",
            end: "bottom 75%",
            toggleActions: "play none none none",
          },
          opacity: 0.03,
          filter: "blur(8px)",
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

      cursorElement.style.backgroundColor = "#e7e5e4";
      cursorElement.style.mixBlendMode = "difference";
    }
  };

  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";

      cursorElement.style.mixBlendMode = "";
      cursorElement.style.backgroundColor = "var(--text-color)";
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

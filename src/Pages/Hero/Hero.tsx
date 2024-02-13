import { useEffect } from "react";
import Name from "../../components/Name/Name";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import Summary from "../../components/Summary/Summary";
import Navbar from "../../components/Navbar/Navbar";
import Cursor from "../../components/Cursor/Cursor";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "./styles.css";
import SplitType, { TargetElement } from "split-type";

export default function Hero() {
  useEffect(() => {
    gsap.fromTo(
      "nav",
      {
        y: "-100%",
        stagger: 0.02,
      },
      {
        y: 0,
        delay: 0.5,
        duration: 0.8,
      }
    );

    gsap.utils.toArray(".__slide-right-left").forEach((element) => {
      gsap.to(element as Element, {
        x: "0%",
        ease: "power3.out",
        scrollTrigger: {
          trigger: element as Element,
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const darkThemeElements = document.querySelectorAll(".__theme-change-dark");
    darkThemeElements.forEach((darkElement) => {
      gsap.to("body", {
        scrollTrigger: {
          trigger: darkElement,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            document.body.classList.add("__dark-mode");
            document.body.style.transition = "300ms ease-in-out";
          },
          onEnterBack: () => {
            document.body.classList.add("__dark-mode");
            document.body.style.transition = "300ms ease-in-out";
          },
          onLeave: () => {
            document.body.classList.remove("__dark-mode");
            document.body.style.transition = "300ms ease-in-out";
          },
          onLeaveBack: () => {
            document.body.classList.remove("__dark-mode");
            document.body.style.transition = "300ms ease-in-out";
          },
        },
      });
    });

    const sectionTitles = document.querySelectorAll(".__section-title");
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
          end: "bottom 50%",
        },
        opacity: 0.03,
        stagger: 0.02,
      });
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div>
      <Cursor />
      <Navbar />
      <Name />
      <Summary />
      <Skills />
      <Projects />
    </div>
  );
}

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import Cursor from "./components/Cursor/Cursor";
import Hero from "./Pages/Hero/Hero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { TargetElement } from "split-type";
gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger,1 ScrollSmoother);

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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

    const darkThemeElements = document.querySelectorAll(".__theme-change-dark");
    darkThemeElements.forEach((darkElement) => {
      gsap.to("body", {
        scrollTrigger: {
          trigger: darkElement,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => document.body.classList.add("__dark-mode"),
          onEnterBack: () => document.body.classList.add("__dark-mode"),
          onLeave: () => document.body.classList.remove("__dark-mode"),
          onLeaveBack: () => document.body.classList.remove("__dark-mode"),
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
          toggleActions: "play none none reverse",
        },
        y: "100%",
        opacity: 0,
        transformOrigin: "left left",
        stagger: 0.02,
        ease: "back.out",
      });
    });
  }, []);

  return (
    <Router>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/portfolio" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;

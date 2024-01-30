import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import Cursor from "./components/Cursor/Cursor";
import Hero from "./Pages/Hero/Hero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
          // markers: true,
          onEnter: () => document.body.classList.add("__dark-mode"),
          onEnterBack: () => document.body.classList.add("__dark-mode"),
          onLeave: () => document.body.classList.remove("__dark-mode"),
          onLeaveBack: () => document.body.classList.remove("__dark-mode"),
        },
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

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Lenis from "@studio-freight/lenis";

import { Suspense, lazy, useEffect } from "react";
import Hero from "./Pages/Hero/Hero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ProjectsList = lazy(() => import("./Pages/Projects/ProjectsList"));

// gsap.registerPlugin(ScrollTrigger,1 ScrollSmoother);

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/portfolio" element={<Hero />} />
          <Route path="/portfolio/projects" element={<ProjectsList />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

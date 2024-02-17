import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import "./App.css";
import AnimatedRoutes from "./AnimatedRoutes";
import Navbar from "./components/Navbar/Navbar";
import Cursor from "./components/Cursor/Cursor";

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
      <Navbar />
      <Cursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

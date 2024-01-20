import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar/Navbar";
import { useLayoutEffect } from "react";
import Cursor from "./components/Cursor/Cursor";
import Hero from "./Pages/Hero/Hero";

// gsap.registerPlugin(ScrollTrigger,1 ScrollSmoother);

function App() {
  useLayoutEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <Router>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;

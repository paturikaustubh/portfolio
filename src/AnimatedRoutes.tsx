import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import Hero from "./Pages/Hero/Hero";
import ProjectsList from "./Pages/Projects/ProjectsList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import { Footer } from "./components/Footer/Footer";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <>
        <Routes location={location} key={location.pathname}>
          <Route path="/portfolio" element={<Hero />} />
          <Route path="/portfolio/projects" element={<ProjectsList />} />
          <Route
            path="/portfolio/projects/:name"
            element={<ProjectDetails />}
          />
        </Routes>
        <Footer />
      </>
    </AnimatePresence>
  );
}

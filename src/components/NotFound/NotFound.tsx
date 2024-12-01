import { useEffect } from "react";

import { gsap } from "gsap";

import { TransitionOverlay } from "../../Transition/transition";

import "./styles.css";

export default function NotFound() {
  useEffect(() => {
    const gsapMatchMedia = gsap.matchMedia();
    const navEle = document.querySelector("nav");
    if (navEle) {
      navEle.classList.remove("sticky");
      navEle.classList.add("fixed");
    }
    const footerEle = document.querySelector("footer");
    if (footerEle) footerEle.classList.add("hidden");

    const textBlendElements =
      document.querySelectorAll<HTMLElement>(".__cursor-blend");

    gsapMatchMedia.add("(min-width: 768px)", () => {
      textBlendElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    });
  });

  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";

      cursorElement.style.backgroundColor = "#E7E5E4";
      cursorElement.style.mixBlendMode = "difference";
    }
  };

  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";
      cursorElement.style.zIndex = "11";
      cursorElement.style.mixBlendMode = "";
      cursorElement.style.backgroundColor = "var(--text-color)";
    }
  };

  return (
    <TransitionOverlay>
      <section className="not-found">
        <div className="title __cursor-blend">
          <span className="number">404</span>
          <span className="text">Oops! Wrong turn</span>
        </div>
      </section>
    </TransitionOverlay>
  );
}

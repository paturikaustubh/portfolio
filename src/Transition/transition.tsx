import { Variants, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";

export const TransitionOverlay = ({ children }: { children: JSX.Element }) => {
  const [locationName, setLocationName] = useState("");

  useLayoutEffect(() => {
    const locationArr = location.pathname
      .split("/")
      .filter((value) => value !== "");
    setLocationName(locationArr[locationArr.length - 1]);
  }, [location.pathname]);

  const anim = (variants: Variants) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  });

  const expand: Variants = {
    initial: {
      left: "0vw",
    },
    enter: {
      left: "100vw",
      transition: {
        duration: 0.75,
        delay: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        left: "-100vw",
      },
    },
    exit: {
      x: "100vw",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="page">
      <div
        className="transition-container"
        style={{
          height: "100dvh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          display: "flex",
          zIndex: 999999,
        }}
      >
        <motion.div
          {...anim(expand)}
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            backgroundColor: "#0c0a09",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="lg:text-6xl text-4xl px-2 translate-y-0 text-stone-200 py-1 font-bold inline-block overflow-hidden opacity-100">
            <motion.span
              initial={{ y: "100%" }}
              animate={{
                y: "0%",
                transitionEnd: { y: "100%", transitionDelay: "1s" },
              }}
              className="inline-block"
            >
              {locationName.charAt(0).toUpperCase() + locationName.slice(1) ===
                "Portfolio" ||
              locationName.charAt(0).toUpperCase() + locationName.slice(1) ===
                ""
                ? "Welcome Home"
                : locationName.charAt(0).toUpperCase() + locationName.slice(1)}
            </motion.span>
          </div>
        </motion.div>
      </div>
      {children}
    </div>
  );
};

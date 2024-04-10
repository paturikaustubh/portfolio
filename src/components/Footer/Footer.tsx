import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const tl = gsap.timeline();

  useEffect(() => {
    tl.to(".connector-cover", {
      scrollTrigger: {
        trigger: ".connector",
        start: "top bottom",
        end: "bottom top",
        scrub: false,
        toggleActions: "play none none none",
      },
      duration: 0.5,
      width: "0%",
    });
  }, []);

  return (
    <footer className="bg-stone-950 lg:p-12 md:p-6 p-3 text-[#E2E0DF]">
      <div className="flex items-center gap-12">
        <p className="text-7xl font-bold">Let's connect!</p>
        <div className="flex items-center grow">
          <span className="me-circle" />
          <div className="connector grow relative h-[2px] bg-white">
            <span className="absolute connector-cover inset-0 size-full bg-black w-full" />
          </div>
          <span className="them-circle" />
        </div>
      </div>
    </footer>
  );
}

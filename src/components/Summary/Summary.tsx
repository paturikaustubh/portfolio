import "./styles.css";

export default function Summary() {
  return (
    <section
      className="flex flex-col items-start justify-start gap-20 overflow-hidden bg-transparent select-none h-fit __section-padding __theme-change-dark"
      id="about-me"
    >
      <div id="summary" className="w-full lg:w-3/4">
        <h1 className="flex flex-col __section-title __cursor-blend md:flex-row">
          About Me <span className="z-[12]">👨🏻</span>
        </h1>
        <span className="inline-block h-full __fade-in __section-desc __cursor-blend">
          A versatile Full-Stack Developer passionately dedicated to craft
          user-centric digital experiences while solving business challenges
          with innovation.
        </span>
      </div>
    </section>
  );
}

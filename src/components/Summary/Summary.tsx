import "./styles.css";

export default function Summary() {
  return (
    <section
      className="overflow-hidden h-fit __section-padding flex flex-col justify-start items-start gap-20 bg-transparent select-none __theme-change-dark"
      id="about-me"
    >
      <div id="summary" className="lg:w-3/4 w-full">
        <h1 className="__section-title __cursor-blend flex md:flex-row flex-col">
          About Me <span className="z-[12]">👨🏻</span>
        </h1>
        <span className="__fade-in h-full __section-desc __cursor-blend inline-block">
          A versatile Full-Stack Developer passionately dedicated to craft
          user-centric digital experiences while solving business challenges
          with innovation.
        </span>
      </div>
    </section>
  );
}

import { useState } from "react";
import "./styles.css";
import Accordion from "../Accordian/Accordian";

export default function Skills() {
  const [accordianActiveIndx, setAccordionActiveIndx] = useState(0);

  return (
    <section className="__section-padding h-screen" id="tech-stack">
      <span className="__section-title __cursor-blend">Tech Stack</span>
      <div className="tech-stack-info-grid w-full grid grid-cols-12 gap-8">
        <div className="md:col-span-8 col-span-12 __section-desc __cursor-blend __fade-in">
          Over the time, I’ve picked up a bunch of cool tech skills. They’ve
          been my sidekicks in creating some awesome stuff and continue to fuel
          my coding adventures.
        </div>
        <div className="md:col-span-4 col-span-12 flex flex-col">
          {/* ACCORDION */}
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={1}
            title="Front End"
            description="React.Js"
          />
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={2}
            title="Back End"
            description="Express.Js"
            borderB={true}
          />
        </div>
      </div>
    </section>
  );
}

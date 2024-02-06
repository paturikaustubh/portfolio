import { useState } from "react";
import "./styles.css";
import Accordion from "../Accordion/Accordion";

export default function Skills() {
  const [accordianActiveIndx, setAccordionActiveIndx] = useState(0);

  return (
    <section className="__section-padding" id="tech-stack">
      <div className="whitespace-nowraps">
        <span className="__section-title __cursor-blend flex md:flex-row flex-col">
          Tech Stack <span className="z-[12]">👨🏻‍💻</span>
        </span>
      </div>
      <div className="tech-stack-info-grid w-full grid grid-cols-12 gap-y-8 md:gap-x-8 overflow-hidden">
        <div className="lg:col-span-8 col-span-12 __section-desc __cursor-blend __fade-in">
          Over the time, I’ve picked up a bunch of cool tech skills. They’ve
          been my sidekicks in creating some awesome stuff and continue to fuel
          my coding adventures.
        </div>
        <div className="lg:col-span-4 col-span-12 flex flex-col">
          {/* ACCORDION */}
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={1}
            title="Front End"
            description={
              <ul className="__tech-stack-list">
                <li>React.Js</li>
                <li>Next.Js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Material UI</li>
              </ul>
            }
          />
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={2}
            title="Back End"
            description={
              <ul className="__tech-stack-list">
                <li>Express.Js</li>
                <li>Node.Js</li>
                <li>Flask (Python)</li>
                <li>Spring Boot (Java)</li>
              </ul>
            }
          />
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={3}
            title="Database"
            description={
              <ul className="__tech-stack-list">
                <li>MySQL</li>
                <li>Google Firebase</li>
                <li>MongoDB</li>
              </ul>
            }
            borderB={true}
          />
        </div>
      </div>
    </section>
  );
}

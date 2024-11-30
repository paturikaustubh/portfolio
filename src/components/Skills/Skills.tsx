import { useState } from "react";
import "./styles.css";
import Accordion from "../Accordion/Accordion";

export default function Skills() {
  const [accordianActiveIndx, setAccordionActiveIndx] = useState(0);

  return (
    <section className="__section-padding" id="tech-stack">
      <div className="whitespace-nowrap">
        <span className="flex flex-col __section-title __cursor-blend md:flex-row">
          Tech Stack <span className="z-[12]">👨🏻‍💻</span>
        </span>
      </div>
      <div className="grid w-full grid-cols-12 tech-stack-info-grid gap-y-8 md:gap-x-8">
        <div className="col-span-12 lg:col-span-8 __section-desc __cursor-blend __fade-in">
          Over the time, I’ve picked up a bunch of cool tech skills. They’ve
          been my sidekicks in creating some awesome stuff and continue to fuel
          my coding adventures.
        </div>
        <div className="flex flex-col col-span-12 overflow-hidden lg:col-span-4">
          {/* ACCORDION */}
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={1}
            title="Frontend"
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
            title="Backend"
            description={
              <ul className="__tech-stack-list">
                <li>Express.Js</li>
                <li>Node.Js</li>
                <li>Flask (Python)</li>
                <li>ASP.Net (C#)</li>
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
          />
          <Accordion
            activeIndx={accordianActiveIndx}
            setActiveIndx={setAccordionActiveIndx}
            indx={4}
            title="Gen AI"
            description={
              <ul className="__tech-stack-list">
                <li>LangChain</li>
                <li>OpenAI</li>
                <li>Google Gemini</li>
              </ul>
            }
            borderB={true}
          />
        </div>
      </div>
    </section>
  );
}

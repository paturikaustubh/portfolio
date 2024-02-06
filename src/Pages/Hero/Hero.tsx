import Name from "../../components/Name/Name";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import Summary from "../../components/Summary/Summary";
import "./styles.css";

export default function Hero() {
  return (
    <div>
      <Name />
      <Summary />
      <Skills />
      <Projects />
    </div>
  );
}

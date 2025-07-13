import { useRef } from "react";
import "./style.css";
import { useConsole } from "./useConsole";

export default function Console() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { command, cursorPosition, isActive, activateConsole, output } =
    useConsole(consoleRef, contentRef);

  const renderCommand = () => {
    const before = command.slice(0, cursorPosition);
    const at = command.charAt(cursorPosition) || " ";
    const after = command.slice(cursorPosition + 1);

    const words = command.split(/(\s+)/);
    const firstWord = words[0];
    const restOfCommand = words.slice(1).join("");

    const renderColoredCommand = () => {
      if (cursorPosition <= firstWord.length) {
        const beforeFirstWord = firstWord.slice(0, cursorPosition);
        const atFirstWord = firstWord.charAt(cursorPosition) || " ";
        const afterFirstWord = firstWord.slice(cursorPosition + 1);
        return (
          <>
            <span className="command-first-word">
              {beforeFirstWord}
              {isActive && <span className="caret">{atFirstWord}</span>}
              {afterFirstWord}
            </span>
            {restOfCommand}
          </>
        );
      } else {
        const adjustedCursorPosition = cursorPosition - firstWord.length;
        const beforeRest = restOfCommand.slice(0, adjustedCursorPosition);
        const atRest = restOfCommand.charAt(adjustedCursorPosition) || " ";
        const afterRest = restOfCommand.slice(adjustedCursorPosition + 1);
        return (
          <>
            <span className="command-first-word">{firstWord}</span>
            {beforeRest}
            {isActive && <span className="caret">{atRest}</span>}
            {afterRest}
          </>
        );
      }
    };

    return <>{renderColoredCommand()}</>;
  };

  const renderHistoryCommand = (cmd: string) => {
    const words = cmd.split(/(\s+)/);
    const firstWord = words[0];
    const restOfCommand = words.slice(1).join("");
    return (
      <>
        <span className="command-first-word">{firstWord}</span>
        {restOfCommand}
      </>
    );
  };

  return (
    <section id="console" ref={consoleRef} onClick={activateConsole}>
      <div className="console-dragger"></div>
      <div className="console-header">Terminal</div>
      <div className="console-content" ref={contentRef}>
        <PKBanner></PKBanner>
        <div className="helper-text">
          ⚡Welcome to KPCLI! Type <code>help</code> to get started.
        </div>
        <div className="output-container">
          {output.map((entry, index) => (
            <div key={index} className="history-entry">
              <p className="command-container">
                <span className="prompt">
                  kaustubhpaturi@portfolio <span>~ $</span>
                </span>
                <span className="command">
                  {renderHistoryCommand(entry.command)}
                </span>
              </p>
              <p
                className="response"
                dangerouslySetInnerHTML={{ __html: entry.response }}
              ></p>
            </div>
          ))}
        </div>
        <p className="command-container">
          <span className="prompt">
            kaustubhpaturi@portfolio <span>~ $</span>
          </span>
          <span className="command">{renderCommand()}</span>
        </p>
      </div>
    </section>
  );
}

function PKBanner() {
  return (
    <pre
      style={{
        fontSize: "1.5em",
        color: "var(--console-base-text-color, white)",
        lineHeight: "1.2",
        whiteSpace: "pre",
        marginBottom: "1em",
      }}
    >
      {String.raw`
██╗  ██╗ ██████╗ 
██║ ██╔╝ ██╔══██╗
█████╔╝  ██████╔╝
██╔═██╗  ██╔═══╝ 
██║ ╚██╗ ██║     
╚═╝  ╚═╝ ╚═╝     
`}
    </pre>
  );
}

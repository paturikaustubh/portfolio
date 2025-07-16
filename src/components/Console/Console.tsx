import { useRef } from "react";
import "./style.css";
import { useConsole } from "./useConsole";

export default function Console() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const consoleToggle = useRef<HTMLButtonElement>(null);

  const toggleTerminalVisible = () => {
    consoleRef.current?.classList.toggle("invisible");
    consoleToggle.current?.classList.toggle("invisible");

    if (consoleRef.current?.classList.contains("invisible"))
      consoleRef.current?.focus();
  };

  const {
    command,
    cursorPosition,
    isActive,
    activateConsole,
    output,
    killTerminal,
  } = useConsole(consoleRef, contentRef, toggleTerminalVisible);

  const renderCommand = () => {
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
    <>
      <button
        id="console-toggle"
        ref={consoleToggle}
        onClick={toggleTerminalVisible}
      >
        <span className="material-symbols-outlined">terminal</span>
      </button>
      <section
        id="console"
        className="invisible"
        ref={consoleRef}
        onClick={activateConsole}
      >
        <div className="console-dragger"></div>
        <div className="console-header">
          <span>Terminal</span>
          <div className="actions">
            <span className="material-symbols-outlined" onClick={killTerminal}>
              delete
            </span>
            <span
              className="material-symbols-outlined"
              onClick={toggleTerminalVisible}
            >
              close
            </span>
          </div>
        </div>
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
    </>
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

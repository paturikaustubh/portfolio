import { useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { useConsole } from "./useConsole";

export default function Console() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const consoleToggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const currentPath = location.pathname.replace("/portfolio", "") || "/";
  const displayPath = currentPath === "/" ? "~" : currentPath;

  const toggleTerminalVisible = useCallback(() => {
    const isCurrentlyInvisible =
      consoleRef.current?.classList.contains("invisible");

    consoleRef.current?.classList.toggle("invisible");
    consoleToggle.current?.classList.toggle("invisible");

    // If it was invisible and now it's visible
    if (isCurrentlyInvisible) {
      activateConsole();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        toggleTerminalVisible();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTerminalVisible]);

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

    // Render without cursor if not active
    if (!isActive) {
      return (
        <>
          {words.map((word, index) => {
            const isFirstWord = index === 0;
            const isFlag = word.startsWith("-");
            const className = isFirstWord
              ? "command-first-word"
              : isFlag
              ? "console-flag"
              : "";
            return (
              <span key={index} className={className}>
                {word}
              </span>
            );
          })}
        </>
      );
    }

    // Render with cursor
    let renderedChars = 0;
    let cursorPlaced = false;

    const parts = words.map((word, index) => {
      const isFirstWord = index === 0;
      const isFlag = word.startsWith("-");
      const className = isFirstWord
        ? "command-first-word"
        : isFlag
        ? "console-flag"
        : "";

      // Don't process if cursor is already placed
      if (cursorPlaced) {
        return (
          <span key={index} className={className}>
            {word}
          </span>
        );
      }

      const wordStart = renderedChars;
      const wordEnd = wordStart + word.length;

      if (cursorPosition >= wordStart && cursorPosition <= wordEnd) {
        const localCursorPos = cursorPosition - wordStart;
        const before = word.slice(0, localCursorPos);
        const at = word.charAt(localCursorPos) || " ";
        const after = word.slice(localCursorPos + 1);
        cursorPlaced = true;

        return (
          <span key={index} className={className}>
            {before}
            <span className="caret">{at}</span>
            {after}
          </span>
        );
      } else {
        renderedChars += word.length;
        return (
          <span key={index} className={className}>
            {word}
          </span>
        );
      }
    });

    // If cursor is at the very end (i.e., after the last character)
    if (!cursorPlaced && cursorPosition === command.length) {
      parts.push(<span key="caret-end" className="caret"> </span>);
    }

    return <>{parts}</>;
  };

  const renderHistoryCommand = (cmd: string) => {
    const words = cmd.split(/(\s+)/);
    return (
      <>
        {words.map((word, index) => {
          const isFirstWord = index === 0;
          const isFlag = word.startsWith("-");
          const className = isFirstWord
            ? "command-first-word"
            : isFlag
            ? "console-flag"
            : "";
          return (
            <span key={index} className={className}>
              {word}
            </span>
          );
        })}
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
            {output.map((entry, index) => {
              const entryDisplayPath = entry.path === "/" ? "~" : entry.path;
              return (
                <div key={index} className="history-entry">
                  <p className="command-container">
                    <span className="prompt">
                      kaustubhpaturi@portfolio <span>{entryDisplayPath} $</span>
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
              );
            })}
          </div>
          <p className="command-container">
            <span className="prompt">
              kaustubhpaturi@portfolio <span>{displayPath} $</span>
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

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cmdActions, pageLs, LsFileEntry, LsEntry } from "./commands";

export interface ConsoleOutput {
  command: string;
  response: string;
  path: string;
}

export const useConsole = (
  consoleRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  toggleTerminalVisible: () => void
) => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<ConsoleOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isTabbing, setIsTabbing] = useState(false);
  const isAtBottom = useRef(true);
  const navigate = useNavigate();

  const scrollIntoView = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbar = document.querySelector(".navbar"); // Assuming your navbar has a class 'navbar'
      const navbarHeight = navbar ? navbar.clientHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const executeCommand = (cmd: string) => {
    const [commandName, ...args] = cmd.trim().split(" ");
    if (isAtBottom.current) {
      setTimeout(() => {
        const contentEl = contentRef.current;
        if (contentEl) {
          contentEl.scrollTop = contentEl.scrollHeight;
        }
      }, 0);
    }
    const currentPath =
      window.location.pathname.replace("/portfolio", "") || "/";
    if (commandName in cmdActions) {
      const action = cmdActions[commandName];
      const result = action(args, navigate, scrollIntoView, killTerminal);
      if (result) {
        setOutput((prev) => [
          ...prev,
          { command: cmd, response: result, path: currentPath },
        ]);
      } else {
        setOutput([]);
      }
    } else {
      // Check if the command matches a file in the current directory
      const currentPath = window.location.pathname.replace("/portfolio", "");
      let pageContent =
        pageLs["portfolio/"][
          currentPath as keyof (typeof pageLs)["portfolio/"]
        ];

      if (!pageContent && currentPath.startsWith("/projects/")) {
        pageContent = pageLs["portfolio/"]["/projects/:name"];
      }

      if (Array.isArray(pageContent)) {
        const targetFile = pageContent.find(
          (item): item is LsFileEntry =>
            item.name === commandName && item.type === "file"
        );
        if (targetFile) {
          if ("scrollId" in targetFile && targetFile.scrollId) {
            scrollIntoView(targetFile.scrollId);
            setOutput((prev) => [
              ...prev,
              {
                command: cmd,
                response: `Executing ${commandName}...`,
                path: currentPath,
              },
            ]);
          } else if (
            "clickSelector" in targetFile &&
            targetFile.clickSelector
          ) {
            const element = document.querySelector(
              targetFile.clickSelector
            ) as HTMLElement;
            if (element) {
              element.click();
              setOutput((prev) => [
                ...prev,
                {
                  command: cmd,
                  response: `Executing ${commandName}...`,
                  path: currentPath,
                },
              ]);
            } else {
              setOutput((prev) => [
                ...prev,
                {
                  command: cmd,
                  response: `<span class="error-message">Could not find element with selector: ${targetFile.clickSelector}</span>`,
                  path: currentPath,
                },
              ]);
            }
          }
          return; // <-- This was missing
        }
      }

      setOutput((prev) => [
        ...prev,
        {
          command: cmd,
          response: `<span class="error-message">Command not found: ${commandName}</span>`,
          path: currentPath,
        },
      ]);
    }
  };

  const handleTabCompletion = () => {
    let currentSuggestions = suggestions;
    const isFirstTab = !isTabbing;

    if (isFirstTab) {
      const [commandName, ...args] = command.trim().split(" ");
      const currentPath = window.location.pathname.replace("/portfolio", "");
      let pageContent =
        pageLs["portfolio/"][
          currentPath as keyof (typeof pageLs)["portfolio/"]
        ] || [];

      if (pageContent.length === 0 && currentPath.startsWith("/projects/")) {
        pageContent = pageLs["portfolio/"]["/projects/:name"];
      }

      let newSuggestions: string[] = [];
      const commandPart = commandName === "cd" ? args[0] || "" : command.trim();

      if (commandName === "cd") {
        newSuggestions = (pageContent as LsEntry[])
          .filter(
            (item) => item.type === "dir" && item.name.startsWith(commandPart)
          )
          .map((item) => item.name);
      } else {
        newSuggestions = (pageContent as LsEntry[])
          .filter(
            (item) => item.type === "file" && item.name.startsWith(commandPart)
          )
          .map((item) => item.name);
      }

      setSuggestions(newSuggestions);
      currentSuggestions = newSuggestions;
      setIsTabbing(true);
    }

    if (currentSuggestions.length === 0) return;

    const newIndex = (suggestionIndex + 1) % currentSuggestions.length;

    const suggestion = currentSuggestions[newIndex];
    const [commandName] = command.trim().split(" ");

    let newCommand = suggestion;
    if (commandName === "cd") {
      newCommand = `cd ${suggestion}`;
    }

    setCommand(newCommand);
    setCursorPosition(newCommand.length);
    setSuggestionIndex(newIndex);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive) return;

      if (e.key !== "Tab") {
        setIsTabbing(false);
      }

      if (!e.key.startsWith("F")) {
        e.preventDefault();
      }

      // Word navigation and deletion
      if (e.ctrlKey) {
        switch (e.key) {
          case "ArrowLeft":
            const prevWordIndex = command
              .slice(0, cursorPosition)
              .trimEnd()
              .lastIndexOf(" ");
            setCursorPosition(prevWordIndex === -1 ? 0 : prevWordIndex + 1);
            return;
          case "ArrowRight":
            const nextWordIndex = command.indexOf(" ", cursorPosition + 1);
            setCursorPosition(
              nextWordIndex === -1 ? command.length : nextWordIndex + 1
            );
            return;
          case "Backspace":
            if (cursorPosition === 0) return;
            const textBeforeCursor = command.slice(0, cursorPosition);
            const trimmedText = textBeforeCursor.trimEnd();
            const lastSpaceIndex = trimmedText.lastIndexOf(" ");
            const from = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
            const newCommand =
              command.slice(0, from) + command.slice(cursorPosition);
            setCommand(newCommand);
            setCursorPosition(from);
            return;
          case "Delete":
            const nextSpaceIndex = command.indexOf(" ", cursorPosition);
            const to = nextSpaceIndex === -1 ? command.length : nextSpaceIndex;
            const newCmd = command.slice(0, cursorPosition) + command.slice(to);
            setCommand(newCmd);
            return;
          case "u":
            setCommand(command.slice(cursorPosition));
            setCursorPosition(0);
            return;
          case "k":
            setCommand(command.slice(0, cursorPosition));
            return;
          case "c":
            setCommand("");
            setCursorPosition(0);
            return;
          case "l":
            setHistory([]);
            return;
          case "a": // Handle Ctrl+A here
            setCursorPosition(0);
            return;
          case "e": // Handle Ctrl+E here
            setCursorPosition(command.length);
            return;
        }
      }

      switch (e.key) {
        case "Tab":
          e.preventDefault();
          handleTabCompletion();
          break;
        case "ArrowUp":
          if (historyIndex < history.length - 1) {
            const newHistoryIndex = historyIndex + 1;
            setHistoryIndex(newHistoryIndex);
            setCommand(history[newHistoryIndex]);
            setCursorPosition(history[newHistoryIndex].length);
          }
          break;
        case "ArrowDown":
          if (historyIndex > 0) {
            const newHistoryIndex = historyIndex - 1;
            setHistoryIndex(newHistoryIndex);
            setCommand(history[newHistoryIndex]);
            setCursorPosition(history[newHistoryIndex].length);
          } else {
            setHistoryIndex(-1);
            setCommand("");
            setCursorPosition(0);
          }
          break;
        case "ArrowLeft":
          if (cursorPosition > 0) {
            setCursorPosition(cursorPosition - 1);
          }
          break;
        case "ArrowRight":
          if (cursorPosition < command.length) {
            setCursorPosition(cursorPosition + 1);
          }
          break;
        case "Backspace":
          if (cursorPosition > 0) {
            const newCommand =
              command.slice(0, cursorPosition - 1) +
              command.slice(cursorPosition);
            setCommand(newCommand);
            setCursorPosition(cursorPosition - 1);
          }
          break;
        case "Delete":
          if (cursorPosition < command.length) {
            const newCommand =
              command.slice(0, cursorPosition) +
              command.slice(cursorPosition + 1);
            setCommand(newCommand);
          }
          break;
        case "Home": // Handle Home key directly
          setCursorPosition(0);
          break;
        case "End": // Handle End key directly
          setCursorPosition(command.length);
          break;
        case "Enter":
          if (command.trim() !== "") {
            if (history[0] !== command) {
              setHistory([command, ...history]);
            }
            executeCommand(command);
          }
          setCommand("");
          setCursorPosition(0);
          setHistoryIndex(-1);
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const newCommand =
              command.slice(0, cursorPosition) +
              e.key +
              command.slice(cursorPosition);
            setCommand(newCommand);
            setCursorPosition(cursorPosition + 1);
          }
          break;
      }
    },
    [
      isActive,
      command,
      history,
      historyIndex,
      cursorPosition,
      isTabbing,
      suggestions,
      suggestionIndex,
    ]
  );

  const activateConsole = () => setIsActive(true);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      isAtBottom.current = scrollHeight - scrollTop <= clientHeight + 1;
    };

    const handleWheel = (e: WheelEvent) => {
      if (contentEl.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    contentEl.addEventListener("scroll", handleScroll);
    contentEl.addEventListener("wheel", handleWheel);

    return () => {
      contentEl.removeEventListener("scroll", handleScroll);
      contentEl.removeEventListener("wheel", handleWheel);
    };
  }, [contentRef]);

  useEffect(() => {
    if (isAtBottom.current) {
      const contentEl = contentRef.current;
      if (contentEl) {
        contentEl.scrollTop = contentEl.scrollHeight;
      }
    }
  }, [output, contentRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (event: MouseEvent) => {
      const consoleElement = document.getElementById("console");
      if (consoleElement && !consoleElement.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const consoleEl = consoleRef.current;
    if (!consoleEl) return;

    const dragger = consoleEl.querySelector(".console-dragger") as HTMLElement;
    if (!dragger) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = consoleEl.offsetHeight;

      const handleMouseMove = (e: MouseEvent) => {
        const newHeight = startHeight - (e.clientY - startY);
        const maxHeight = window.innerHeight;
        const minHeight = 0; // Or any other minimum height you prefer
        if (newHeight > minHeight && newHeight < maxHeight) {
          consoleEl.style.height = `${newHeight}px`;
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    dragger.addEventListener("mousedown", handleMouseDown);

    return () => {
      dragger.removeEventListener("mousedown", handleMouseDown);
    };
  }, [consoleRef]);

  const killTerminal = () => {
    toggleTerminalVisible();
    setCommand("");
    setHistory([]);
    setOutput([]);
    setHistoryIndex(-1);
    setCursorPosition(0);
    setIsActive(false);
    setSuggestions([]);
    setSuggestionIndex(0);
    setIsTabbing(false);
  };

  return {
    command,
    cursorPosition,
    isActive,
    activateConsole,
    output,
    killTerminal,
  };
};

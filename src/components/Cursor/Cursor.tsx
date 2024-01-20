import { useEffect, useState } from "react";
import "./styles.css";

export default function Cursor() {
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bodyElement = document.body;
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    const textBlendElements =
      document.querySelectorAll<HTMLElement>(".__cursor-blend");

    textBlendElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (cursorElement) {
          cursorElement.style.scale = "10";
          const mode = document.body.className;
          cursorElement.style.backgroundColor =
            mode === "__dark-mode" ? "var(--text-color)" : "var(--bg-color)";
          cursorElement.style.mixBlendMode = "difference";
        }
      });

      element.addEventListener("mouseleave", () => {
        if (cursorElement) {
          cursorElement.style.scale = "1";
          cursorElement.style.mixBlendMode = "";
          cursorElement.style.backgroundColor = "var(--text-color)";
        }
      });
    });

    bodyElement.addEventListener("mousemove", ({ clientX, clientY }) =>
      setCursorCoords({ x: clientX, y: clientY })
    );
  }, []);

  return (
    <div
      className="__custom-cursor"
      style={{
        height: 20,
        width: 20,
        top: `${cursorCoords.y - 10}px`,
        left: `${cursorCoords.x - 10}px`,
      }}
    />
  );
}

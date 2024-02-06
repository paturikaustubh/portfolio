import { useEffect } from "react";
import "./styles.css";

export default function Cursor() {
  const mouseMoveListner = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    const projectImgSection = document.querySelector<HTMLImageElement>(
      ".__projects-img-section"
    );
    cursor?.animate(
      {
        left: `${clientX - 10}px`,
        top: `${clientY - 10}px`,
      },
      { duration: 900, fill: "forwards", delay: 50 }
    );
    projectImgSection?.animate(
      {
        left: `${clientX - 10}px`,
        top: `${clientY - 10}px`,
      },
      { duration: 1600, fill: "forwards", delay: 80 }
    );
  };

  const handleScroll = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) {
      cursor.style.scale = "1";
      cursor.style.mixBlendMode = "";
    }
  };

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
          cursorElement.style.backgroundColor = "#e7e5e4";
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

    bodyElement.addEventListener("mousemove", mouseMoveListner);
    bodyElement.addEventListener("scroll", handleScroll);

    return () => {
      bodyElement.removeEventListener("mousemove", mouseMoveListner);
    };
  }, []);

  return (
    <div
      className="__custom-cursor"
      style={{
        height: 20,
        width: 20,
      }}
    />
  );
}

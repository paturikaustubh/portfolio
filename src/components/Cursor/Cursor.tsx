import { useEffect } from "react";
import "./styles.css";

export default function Cursor() {
  // ANCHOR STATES && VARIABLES

  // ANCHOR EFFECTS
  useEffect(() => {
    const bodyElement = document.body;

    bodyElement.addEventListener("mousemove", mouseMoveListner);

    return () => {
      bodyElement.removeEventListener("mousemove", mouseMoveListner);
    };
  }, []);

  // ANCHOR FUNCTIONS
  const mouseMoveListner = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    const projectImgSection = document.querySelector<HTMLImageElement>(
      ".__projects-img-section",
    );

    const elementUnderCursor = document.elementFromPoint(clientX, clientY);
    if (elementUnderCursor?.closest(".__theme-change-dark")) {
      cursor?.classList.add("light-mode");
    } else {
      cursor?.classList.remove("light-mode");
    }

    cursor?.animate(
      {
        left: `${clientX - 10}px`,
        top: `${clientY - 10}px`,
      },
      { duration: 500, fill: "forwards" },
    );
    projectImgSection?.animate(
      {
        left: `${clientX - 10}px`,
        top: `${clientY - 10}px`,
      },
      { duration: 1600, fill: "forwards" },
    );
  };

  return (
    <div
      className="__custom-cursor"
    />
  );
}

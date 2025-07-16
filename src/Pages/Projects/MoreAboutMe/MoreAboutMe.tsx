import { Fragment, useEffect, useLayoutEffect, useState } from "react";

import { gsap } from "gsap";
import SplitType, { TargetElement } from "split-type";
import dayjs from "dayjs";

import { TransitionOverlay } from "../../../Transition/transition";

import "./styles.css";
// import { Link } from "react-router-dom";

export default function MoreAboutMe() {
  const [visibleParagraphs, setVisibleParagraphs] = useState(2);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const paragraphs = [
    <p className="name-title">
      <strong>Hey there! 👋 Kaustubh Paturi here</strong>
      (yupp, that’s me in the pic 👀)
    </p>,
    <p>
      So, how did I end up on your screen? It all started on{" "}
      <strong>
        <i>
          March 23<sup>rd</sup>
        </i>
      </strong>
      , 2002 (yes, I’ll wait while you add it to your reminders—
      {dayjs().month(2).date(23).isBefore(dayjs(), "day")
        ? dayjs().month(2).date(23).add(1, "year").diff(dayjs(), "day")
        : dayjs().month(2).date(23).diff(dayjs(), "day")}{" "}
      days to go! 🎂 😏). That’s when the world got 1 Kaustubh richer
      (worldPopulation++).😎
    </p>,
    <p>
      Back in 2019, I finished my 12th grade with absolutely no clue what I
      wanted to do in life. But while I was doing my engineering (CSE, because
      duh), a friend roped me into this college project called{" "}
      {/* <Link to={"/projects/exam-branch-portal"} className="underline"> */}
      <strong>
        <i>Exam Branch Portal</i>
      </strong>
      {/* </Link> */}. And BOOM 💥—I was introduced to the beautiful chaos; web
      app development (I can really center a div, trust me).
    </p>,
    <p>
      I’m also into video and image editing — because who doesn’t love a bit of
      creativity? 🎨 This love for creating things pushed me deeper into
      frontend development (although, cars were my first love 😍). And talking
      about cars, I just admire{" "}
      <strong>
        <i>Aston Martin Vanquish</i>
      </strong>
      . 💘
    </p>,
    <>
      <p>
        My journey didn’t stop there. I started my journey at{" "}
        <strong>
          <i>Veratroniks</i>
        </strong>
        , where I developed{" "}
        <strong>
          <i>VBOSS</i>
        </strong>{" "}
        (sounds fancy, right?). Then I leveled up 🎮 and joined{" "}
        <strong>
          <i>Centific</i>
        </strong>{" "}
        as an intern. After six months of proving I’m not just here to make
        coffee, I got converted to full-time. Now I’m chilling (not really) as
        an{" "}
        <strong>
          <i>Associate Software Engineer</i>
        </strong>
        .
      </p>

      <p>
        The road ahead is long and wide, and guess what? It’s ours to shape.
        Let’s build something incredible, one step at a time. 🌟
      </p>
      <p className="flex w-full">
        <strong className="mx-auto">
          <i>Nothing great ever came that easy</i>
        </strong>
      </p>
    </>,
  ];

  useLayoutEffect(() => {
    const gsapMatchMedia = gsap.matchMedia();
    const kaustubhImgEle = document.getElementById("img-container");
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    const textBlendElements =
      document.querySelectorAll<HTMLElement>(".__cursor-blend");

    // ANCHOR LARGE SCREEN ANIMS  ||========================================================================
    gsapMatchMedia.add("(min-width: 768px)", () => {
      setIsSmallScreen(false);
      // ANCHOR CURSOR SIZING  ||========================================================================
      textBlendElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    if (kaustubhImgEle) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = kaustubhImgEle.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const width = rect.width;
        const height = rect.height;

        const rotateX = (mouseY / height - 0.5) * -3;
        const rotateY = (mouseX / width - 0.5) * 3;

        kaustubhImgEle.style.setProperty("--x-deg", `${rotateX}deg`);
        kaustubhImgEle.style.setProperty("--y-deg", `${rotateY}deg`);

        kaustubhImgEle.style.transform = `perspective(1000px) rotateX(var(--x-deg)) rotateY(var(--y-deg))`;
        setTimeout(() => {
          kaustubhImgEle.style.transition = "transform 0s ease-out";
        }, 50);
      };

      const handleMouseEnter = () => {
        kaustubhImgEle.style.transition = "transform 0.1s ease-out";

        if (cursor) {
          cursor.style.border = "1px solid #E7E5E4";
        }
      };

      const handleMouseLeave = () => {
        kaustubhImgEle.style.transition = "transform 0.3s ease-out";
        kaustubhImgEle.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        if (cursor) {
          cursor.style.borderWidth = "0px";
        }
      };

      kaustubhImgEle.addEventListener("mousemove", handleMouseMove);
      kaustubhImgEle.addEventListener("mouseenter", handleMouseEnter);
      kaustubhImgEle.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        kaustubhImgEle.removeEventListener("mousemove", handleMouseMove);
        kaustubhImgEle.removeEventListener("mouseenter", handleMouseEnter);
        kaustubhImgEle.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 768);
    });
    const paragraphs = document.querySelectorAll(".desc-img .description p");
    const newParagraphs = Array.from(paragraphs);
    const timeline = gsap.timeline({ paused: true });

    (newParagraphs as TargetElement[]).forEach((paragraph) => {
      const { words } = new SplitType(paragraph, { types: "words" });

      timeline.from(words, {
        opacity: 0.03,
        filter: "blur(8px)",
        stagger: 0.04,
        duration: 1,
        ease: "power1.out",
        delay: 0.8,
      });
    });
    timeline.play();
  }, []);

  useEffect(() => animateNewParagraphs, [visibleParagraphs]);

  // GSAP animation for the newly revealed paragraphs
  const animateNewParagraphs = () => {
    const paragraphs = document.querySelectorAll(".desc-img .description p");
    const newParagraphs = Array.from(paragraphs).slice(visibleParagraphs);
    const timeline = gsap.timeline({ paused: true, delay: 0.2 });

    (newParagraphs as TargetElement[]).forEach((paragraph) => {
      const { words } = new SplitType(paragraph, { types: "words" });

      timeline.from(words, {
        opacity: 0.03,
        filter: "blur(8px)",
        stagger: 0.04,
        duration: 1,
        ease: "power1.out",
      });
    });
    timeline.play();
  };

  const handleMouseEnter = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "14";
      cursorElement.style.backgroundColor = "#E7E5E4";
      cursorElement.style.mixBlendMode = "difference";
    }
  };

  const handleMouseLeave = () => {
    const cursorElement =
      document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursorElement) {
      cursorElement.style.scale = "1";
      cursorElement.style.zIndex = "11";
      cursorElement.style.mixBlendMode = "";
      cursorElement.style.backgroundColor = "var(--text-color)";
    }
  };

  const handleReadMore = () => {
    setVisibleParagraphs((prev) => (prev += 1));
  };

  return (
    <TransitionOverlay>
      <section className="__section-padding">
        <h1 className="__section-title __cursor-blend">
          More About Me
          <span className="z-[12] fun-text-container">
            🧍🏻‍♂️
            {!isSmallScreen && (
              <span className="fun-text">Imagine the emojI with a beard</span>
            )}
          </span>
        </h1>
        {!isSmallScreen ? (
          <div className="desc-img">
            <div id="img-container">
              <img
                src="./assets/kaustubh-paturi.jpg"
                alt="Most handsome guy 😎"
                className="kaustubh-img"
              />
            </div>
            <div className="description details-text">
              {paragraphs
                .slice(0, visibleParagraphs)
                .map((paragraph, index) => (
                  <Fragment key={index}>{paragraph}</Fragment>
                ))}
            </div>
            {visibleParagraphs < paragraphs.length && (
              <button
                className="px-4 py-2 mt-12 font-light border expand-bg duration-300s hover:rounded-md details-text"
                id="read-more-button"
                onClick={handleReadMore}
              >
                Read More
              </button>
            )}
          </div>
        ) : (
          <div className="desc-img">
            <div className="description details-text">
              {paragraphs.slice(0, 1).map((paragraph, index) => (
                <Fragment key={index}>{paragraph}</Fragment>
              ))}
            </div>
            <div id="img-container">
              <img
                src="./assets/kaustubh-paturi.jpg"
                alt="Most handsome guy 😎"
                className="kaustubh-img"
              />
            </div>
            <div className="description details-text">
              {paragraphs
                .slice(1, visibleParagraphs)
                .map((paragraph, index) => (
                  <Fragment key={index}>{paragraph}</Fragment>
                ))}
            </div>
            {visibleParagraphs < paragraphs.length && (
              <button
                className="px-4 py-2 mt-12 font-light border expand-bg duration-300s hover:rounded-md details-text"
                id="read-more-button"
                onClick={handleReadMore}
              >
                Read More
              </button>
            )}
          </div>
        )}
      </section>
    </TransitionOverlay>
  );
}

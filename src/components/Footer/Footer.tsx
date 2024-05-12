import { useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";

import "./styles.css";

export function Footer() {
  const userMessagesRef = collection(db, "userMessages");

  const [instantMsgDetails, setInstantMsgDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const tl = gsap.timeline();
  useEffect(() => {
    tl.to(".connector", {
      scrollTrigger: {
        trigger: ".connector",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none none",
        onEnter: () => {
          const connectorElement =
            document.querySelector<HTMLSpanElement>(".connector");
          const circleElement =
            document.querySelectorAll<HTMLSpanElement>(".connector-circle");
          const rippleEle =
            document.querySelectorAll<HTMLSpanElement>(".circle-ripple");

          if (connectorElement) {
            connectorElement.style.animation =
              "connector-expand 0.45s cubic-bezier(.82,0,.55,.89) forwards";
          }
          if (circleElement) {
            circleElement.forEach(
              (element) =>
                (element.style.animation =
                  "connector-circle-reveal 0.25s 0.35s ease-out forwards")
            );
          }
          if (rippleEle)
            rippleEle.forEach(
              (element) =>
                (element.style.animation =
                  "connector-circle-ripple 0.7s 0.4s cubic-bezier(0.34, 0.82, 0.36, 0.98) forwards")
            );
        },
        onLeaveBack: () => {
          const connectorElement =
            document.querySelector<HTMLSpanElement>(".connector");
          const circleElement =
            document.querySelectorAll<HTMLSpanElement>(".connector-circle");
          const rippleEle =
            document.querySelectorAll<HTMLSpanElement>(".circle-ripple");

          if (connectorElement) {
            connectorElement.style.animation =
              "connector-expand-reset 0s cubic-bezier(.82,0,.55,.89) forwards";
          }
          if (circleElement) {
            circleElement.forEach(
              (element) =>
                (element.style.animation =
                  "connector-circle-reveal-reset 0S ease-out forwards")
            );
          }
          if (rippleEle)
            rippleEle.forEach(
              (element) =>
                (element.style.animation =
                  "connector-circle-ripple-reset 0s cubic-bezier(0.34, 0.82, 0.36, 0.98) forwards")
            );
        },
      },
    });

    const footer = document.querySelector("footer");
    if (footer) {
      footer.addEventListener("mouseenter", () => {
        const cursorElement =
          document.querySelector<HTMLDivElement>(".__custom-cursor");
        if (cursorElement) {
          cursorElement.style.backgroundColor = "#e7e5e4";
        }
      });
      footer.addEventListener("mouseleave", () => {
        const cursorElement =
          document.querySelector<HTMLDivElement>(".__custom-cursor");
        if (cursorElement) {
          cursorElement.style.backgroundColor = "var(--text-color)";
        }
      });
    }
  }, []);

  const handleInstantMsgDetailsChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInstantMsgDetails({ ...instantMsgDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addDoc(userMessagesRef, instantMsgDetails)
      .then(() => {
        console.log("Message added successfully!");
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };

  return (
    <footer className="bg-stone-950 lg:p-12 md:p-6 p-3 text-[#E2E0DF] mt-auto overflow-x-hidden">
      <div className="flex md:flex-row flex-col items-center gap-x-12 gap-y-6">
        <p className="lg:text-7xl md:text-6xl text-5xl font-bold">
          Let's connect!
        </p>
        <div className="flex items-center grow justify-between md:w-fit w-full md:px-0 px-6 ">
          <span className="connector-circle">
            <span className="circle-ripple" />
          </span>
          <span className="connector bg-white w-0 h-[3px] duration-1000" />
          <span className="connector-circle">
            <span className="circle-ripple" />
          </span>
        </div>
      </div>

      <div className="mt-14 grid lg:grid-cols-3 grid-cols-1 items-start">
        <div className="lg:col-span-2">
          <p className="text-4xl font-semibold">Send Instant Message</p>
          <form className="flex flex-col gap-3 mt-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex items-center gap-1">
                <div className="input-label grow" data-label="First Name">
                  <input
                    required
                    name="firstName"
                    type="text"
                    className="p-2 rounded-l-md "
                    placeholder=""
                    value={instantMsgDetails.firstName}
                    onChange={handleInstantMsgDetailsChange}
                  />
                </div>
                <div className="input-label grow" data-label="Last Name">
                  <input
                    required
                    name="lastName"
                    type="text"
                    className="p-2 rounded-r-md"
                    placeholder=""
                    value={instantMsgDetails.lastName}
                    onChange={handleInstantMsgDetailsChange}
                  />
                </div>
              </div>
              <div className="input-label grow" data-label="Email">
                <input
                  required
                  type="email"
                  name="email"
                  className="p-2 rounded-md"
                  placeholder=""
                  value={instantMsgDetails.email}
                  onChange={handleInstantMsgDetailsChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="grow col-span-2">
              <div
                className="input-label"
                data-label="Message"
                data-message={`${instantMsgDetails.message.length}/500`}
              >
                <textarea
                  required
                  name="message"
                  className="rounded-md h-52 resize-none p-2"
                  placeholder=""
                  value={instantMsgDetails.message}
                  onChange={handleInstantMsgDetailsChange}
                  maxLength={500}
                />
              </div>
            </div>
            <div className="ml-auto">
              <button className="rounded-md px-3 py-1 text-2xl expand-bg font-semibold">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

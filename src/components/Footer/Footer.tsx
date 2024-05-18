import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import dayjs from "dayjs";

import "./styles.css";
import Loading from "../LoadingScreen";
import Alert from "../Alert";
import { Link } from "react-router-dom";

export function Footer() {
  const userMessagesRef = collection(db, "userMessages");

  const [instantMsgDetails, setInstantMsgDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    timestamp: "",
  });

  const tl = gsap.timeline();
  useEffect(() => {
    tl.to(".connector", {
      scrollTrigger: {
        trigger: ".connector",
        start: "top 95%",
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
                  "connector-circle-reveal 0.3s 0.35s cubic-bezier(.38,-0.01,.32,2.52) forwards")
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
    Loading(true, "Sending message...");
    e.preventDefault();

    const { firstName, lastName, email, message } = instantMsgDetails;
    const finalValues = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: dayjs().format("DD MMM, YY (hh:mm A)"),
    };

    addDoc(userMessagesRef, finalValues)
      .then(() => {
        setInstantMsgDetails({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          timestamp: "",
        });
        Alert("Message reached destination!", "success");
      })
      .catch((error) => {
        Alert("Sorry, there was an error...", "error");
        console.error("Error adding message:", error);
      })
      .finally(() => Loading(false));
  };

  const handleSocialMediaLinkHover = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.classList.add("animate-pulse-fast");
  };

  const handleSocialMediaLinkBlur = () => {
    const cursor = document.querySelector<HTMLDivElement>(".__custom-cursor");
    if (cursor) cursor.classList.remove("animate-pulse-fast");
  };

  return (
    <footer className="bg-stone-950 lg:px-12 flex flex-col lg:pt-12 md:px-6 md:pt-6 px-3 pt-3 text-[#E2E0DF] mt-auto overflow-x-hidden">
      <div className="flex md:flex-row flex-col items-center gap-x-12 gap-y-6">
        <p className="lg:text-7xl md:text-6xl text-4xl font-bold">
          Let's connect! 🔗
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

      <div className="mt-14 grid lg:grid-cols-5 grid-cols-1 items-start gap-x-12 gap-y-6">
        <div className="lg:col-span-3">
          <p className="md:text-4xl text-3xl font-semibold">
            Send Instant Message
          </p>
          <form className="flex flex-col gap-3 mt-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex items-center gap-1">
                <span className="input-label grow" data-label="First Name">
                  <input
                    required
                    name="firstName"
                    type="text"
                    className="p-2 rounded-l-md "
                    placeholder=""
                    value={instantMsgDetails.firstName}
                    onChange={handleInstantMsgDetailsChange}
                  />
                </span>
                <span className="input-label grow" data-label="Last Name">
                  <input
                    required
                    name="lastName"
                    type="text"
                    className="p-2 rounded-r-md"
                    placeholder=""
                    value={instantMsgDetails.lastName}
                    onChange={handleInstantMsgDetailsChange}
                  />
                </span>
              </div>
              <span className="input-label grow" data-label="Email">
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
              </span>
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
              <button
                className="rounded-md px-3 py-1 text-2xl inst-msg-send font-semibold border-2"
                onMouseEnter={() => {
                  const cursor =
                    document.querySelector<HTMLDivElement>(".__custom-cursor");
                  if (cursor) {
                    cursor.style.mixBlendMode = "difference";
                  }
                }}
                onMouseLeave={() => {
                  const cursor =
                    document.querySelector<HTMLDivElement>(".__custom-cursor");
                  if (cursor) {
                    cursor.style.mixBlendMode = "";
                  }
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 self-stretch">
          <p className="text-4xl font-semibold text-center">
            Find me on socials
          </p>
          <div className="flex flex-col items-center justify-center mt-12 gap-3 text-xl">
            <div className="social-link">
              <span>GitHub</span>
              <Link
                target="_blank"
                to={"https://github.com/paturikaustubh"}
                className="text-white"
                onMouseEnter={handleSocialMediaLinkHover}
                onMouseLeave={handleSocialMediaLinkBlur}
              >
                paturikaustubh
              </Link>
            </div>
            <div className="social-link">
              <span>LinkedIn</span>
              <Link
                target="_blank"
                to={"https://www.linkedin.com/in/kaustubhpaturi/"}
                className="text-blue-400"
                onMouseEnter={handleSocialMediaLinkHover}
                onMouseLeave={handleSocialMediaLinkBlur}
              >
                kaustubhpaturi
              </Link>
            </div>
            <div className="social-link">
              <span>Facebook</span>
              <Link
                target="_blank"
                to={"https://www.facebook.com/kaustubh.paturi.5/"}
                className="text-blue-500"
                onMouseEnter={handleSocialMediaLinkHover}
                onMouseLeave={handleSocialMediaLinkBlur}
              >
                kaustubh.paturi.5
              </Link>
            </div>
            <div className="social-link">
              <span>X (Twitter)</span>
              <Link
                target="_blank"
                to={"https://twitter.com/kaustub18850193"}
                className="text-white"
                onMouseEnter={handleSocialMediaLinkHover}
                onMouseLeave={handleSocialMediaLinkBlur}
              >
                kaustub18850193
              </Link>
            </div>
            <div className="social-link">
              <span>Instagram</span>
              <Link
                target="_blank"
                to={"https://www.instagram.com/not_sardonian/"}
                className="text-pink-600"
                onMouseEnter={handleSocialMediaLinkHover}
                onMouseLeave={handleSocialMediaLinkBlur}
              >
                not_sardonian
              </Link>
            </div>
            {/* <span>Facebook</span>
            <span>X (Twitter)</span>
            <span>Instagram</span> */}
          </div>
        </div>
      </div>

      <div className="mt-24 text-center flex flex-col gap-4 mb-2">
        <p className="text-neutral-300 ">Nothing great ever came that easy</p>
        <p className="opacity-40 font-semibold text-sm">
          Made with ❤️ by Kaustubh Paturi
        </p>
      </div>
    </footer>
  );
}

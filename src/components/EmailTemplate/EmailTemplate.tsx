import { Link } from "react-router-dom";
import "./styles.css";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function EmailTemplate({
  instantMsgDetails,
  messageId,
}: {
  instantMsgDetails: ContactForm;
  messageId: string;
}) {
  return (
    <section className="email-container">
      <div className="email-content">
        <section className="email-title-container">
          <p className="email-title">Wohhooo!!🥳</p>
          <span className="email-sub-title">
            There is a new message from{" "}
            <strong>{instantMsgDetails.firstName}</strong> 👀
          </span>
        </section>
        <section className="body">
          <div className="message">
            <span>
              Okay andi,{" "}
              <strong>
                {instantMsgDetails.firstName} {instantMsgDetails.lastName}
              </strong>{" "}
              oka message pampicharu {instantMsgDetails.timestamp} ki. Enti...
              mana portfolio nunchi!😌
            </span>
            <span>Inka late deniki...😏 Chaduv po</span>
            <span>
              Not sure about this, but they said their E-Mail id is{" "}
              <strong>{instantMsgDetails.email}</strong>. Andukey ana, kaastha
              email verificationpetuko ani... Vintey kada...🤧
            </span>
          </div>
          <div className="button-container">
            <span>
              Well, since this is a surprise for you (I mean me), I can't show
              the message here, but I can take you to the message.
            </span>
            <span>Just make sure you remember your login credentials 👀</span>
          </div>
          <Link
            to={`https://paturikaustubh.github.io/portfolio-responses?id=${messageId}`}
            // state={{ messageId: messageId }}
            className="redirect-button"
            target="_blank"
          >
            MESSAGE CHUPI!!
          </Link>
        </section>
      </div>
    </section>
  );
}

import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Loading from "../LoadingScreen";
import Alert from "../Alert";

dayjs.extend(utc);

interface ConsoleMessage {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const submitMessageFromConsole = async (
  formData: ConsoleMessage
): Promise<string> => {
  const { firstName, lastName, email, message } = formData;

  if (!firstName.trim())
    return `<span class="error-message">First name cannot be empty.</span>`;
  if (!email.trim())
    return `<span class="error-message">Email cannot be empty.</span>`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return `<span class="error-message">Invalid email format.</span>`;
  if (!message.trim())
    return `<span class="error-message">Message cannot be empty.</span>`;
  if (message.length > 500)
    return `<span class="error-message">Message cannot exceed 500 characters.</span>`;

  Loading(true, "Sending message...");

  const finalValues = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: dayjs.utc().format("DD MMM, YY (hh:mm A)"),
  };

  try {
    const userMessagesRef = collection(db, "userMessages");
    await addDoc(userMessagesRef, finalValues);
    Alert("Message reached destination!", "success");
    return "Transmission complete.\nYour message is now hurtling through the digital cosmos towards Kaustubh.";
  } catch (error) {
    console.error("Error adding message from console:", error);
    Alert("Sorry, there was an error...", "error");
    return `<span class="error-message">Failed to send message. See browser console for details.</span>`;
  } finally {
    Loading(false);
  }
};

export default function Alert(
  message: string,
  severity: "info" | "error" | "success" | "warning",
  open: boolean = true
) {
  const alertContainer = document.getElementById("alert-container");

  if (open) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `px-4 py-2 flex items-center overflow-x-hidden md:text-base text-sm w-fit rounded-md ${
      severity === "info"
        ? "bg-blue-50 text-blue-800"
        : severity === "error"
        ? "bg-red-50 text-red-800"
        : severity === "success"
        ? "bg-green-50 text-green-800"
        : "bg-yellow-50 text-yellow-500"
    }`;
    alertDiv.style.animation =
      "show-alert 350ms ease-out, hide-alert 350ms 3500ms ease-in forwards";
    alertDiv.innerHTML = message;
    (alertContainer as HTMLDivElement).appendChild(alertDiv);

    setTimeout(() => {
      (alertContainer as HTMLDivElement).removeChild(alertDiv);
    }, 4000);
  }
}

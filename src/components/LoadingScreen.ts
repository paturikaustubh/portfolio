export default function Loading(
  open: boolean,
  message = "Loading Data...",
  id?: string
) {
  if (open) {
    const rootEle = document.getElementById("root");

    // CREATE CONTAINER
    const loadingContainer = document.createElement("div");
    loadingContainer.className =
      "fixed inset-0 w-full h-full flex justify-center items-center z-50 loading-container";
    loadingContainer.style.backgroundColor = "rgba(0 0 0 / 0.8)";
    loadingContainer.style.backdropFilter = "blur(5px)";
    loadingContainer.style.animation = "fade-in 150ms ease-in-out forwards";

    // CREATE CONTENT
    const loadingContent = document.createElement("div");
    loadingContent.className =
      "absolute flex items-center lg:gap-4 md:gap-3 gap-2 text-white lg:text-5xl md:text-4xl text-3xl";

    // CREATE ANIMATION
    const loadingAnimation = document.createElement("span");
    loadingAnimation.className =
      "rounded-full border-[6px] border-y-neutral-300 border-l-neutral-300 size-12 border-r-neutral-700";
    loadingAnimation.style.animation =
      "loading-animation 2000ms linear infinite";

    // APPEND ANIMATION INTO CONTENT
    loadingContent.append(message);
    loadingContent.append(loadingAnimation);

    // APPEND CONTENT TO CONTAINER
    loadingContainer.appendChild(loadingContent);

    if (id) {
      const loadingParent = document.getElementById(id);

      if (loadingParent) {
        const parentFirstChild = loadingParent.firstChild;
        loadingParent?.insertBefore(loadingContainer, parentFirstChild);
      }
    } else document.body.insertBefore(loadingContainer, rootEle);
  } else {
    const loadingContainer =
      document.querySelectorAll<HTMLDivElement>(".loading-container");

    if (loadingContainer) {
      loadingContainer.forEach((container) => {
        container.style.animation = "fade-out 150ms ease-in-out forwards";
        setTimeout(() => {
          container.remove();
        }, 200);
      });
    }
  }
}

import { projectsInfos } from "../../ProjectsInfos";
import { socialLinks } from "../../socialLinks";

const angLt = "&lt;";
const angGt = "&gt;";

const globalCommands = ["help", "clear", "ls", "cd", "nav", "socials", "exit"];

const helpString = `Hello there! Using this CLI, you can controll this site. You can navigate through pages and do some other cool stuff...
Now, here are the list of available commands you can use:
${globalCommands.map((cmd) => `- ${cmd}`).join("\n")}`;

type CommandAction = (
  args: string[],
  navigate?: (path: string) => void,
  scrollIntoView?: (id: string) => void,
  toggleTerminalVisible?: () => void,
  killTerminal?: () => void
) => string | null;

export interface LsDirEntry {
  name: string;
  type: "dir";
  path: string;
}

export interface LsFileEntry {
  name: string;
  type: "file";
  scrollId?: string;
  clickSelector?: string;
}

export type LsEntry = LsDirEntry | LsFileEntry;

export function isLsFileEntry(item: LsEntry): item is LsFileEntry {
  return item.type === "file" && "scrollId" in item;
}

export function isLsDirEntry(item: LsEntry): item is LsDirEntry {
  return item.type === "dir" && "path" in item;
}

const cdCmd: CommandAction = (args, navigate) => {
  if (!navigate) return "Navigation not available.";
  if (args.length === 0)
    return `I wonder where a directory taskes me...\n\nUsage: cd ${angLt}directory${angGt}`;

  const target = args[0];
  const currentPath = window.location.pathname.replace("/portfolio", "") || "/";

  if (target.startsWith("..")) {
    if (currentPath === "/")
      return `<span class="error-message">cd: No such directory: ${target}</span>`;

    const pathSegments = currentPath.split("/").filter((segment) => segment);
    const upLevels = (target.match(/\.\./g) || []).length;

    if (upLevels > pathSegments.length) {
      return `<span class="error-message">cd: No such directory: ${target}</span>`;
    }

    const newPathSegments = pathSegments.slice(0, -upLevels);
    const newPath = `/${newPathSegments.join("/")}`;
    navigate(`/portfolio${newPath}`);
    return `Navigating to ${newPath}`;
  }

  const currentDirContent =
    pageLs["portfolio/"][currentPath as keyof (typeof pageLs)["portfolio/"]];

  if (Array.isArray(currentDirContent)) {
    const targetItem = currentDirContent.find(
      (item): item is LsDirEntry => item.name === target && item.type === "dir"
    );
    if (targetItem && isLsDirEntry(targetItem) && targetItem.path) {
      navigate(`/portfolio${targetItem.path}`);
      return `Navigating to ${targetItem.path}`;
    }
  }
  return `<span class="error-message">cd: No such directory: ${target}</span>`;
};

const lsAction: CommandAction = () => {
  const currentPath = window.location.pathname.replace("/portfolio", "");
  let itemsToDisplay: LsEntry[] = [];

  // Try to find content for the specific route under "portfolio/"
  let routeContent =
    pageLs["portfolio/"][currentPath as keyof (typeof pageLs)["portfolio/"]];

  if (!routeContent && currentPath.startsWith("/projects/")) {
    routeContent = pageLs["portfolio/"]["/projects/:name"];
  }

  if (routeContent) {
    // Ensure routeContent is an array. If it's a single object, wrap it.
    itemsToDisplay = Array.isArray(routeContent)
      ? routeContent
      : [routeContent];
  }

  let content = "";
  itemsToDisplay.forEach((item) => {
    if (item.type === "dir") {
      content += `<span class="ls-dir">${item.name}</span>  `;
    } else if (item.type === "file") {
      content += `<span class="ls-file">${item.name}</span>  `;
    }
  });

  return content;
};

const exitCmd: CommandAction = (
  _args,
  _navigate,
  _scrollIntoView,
  killTerminal
) => {
  if (killTerminal) {
    killTerminal();
  }
  return null;
};

const navCmd: CommandAction = (args) => {
  const navMapping: { [key: string]: string } = {
    home: "nav-home",
    projects: "nav-projects",
    resume: "nav-resume",
    "contact-me": "nav-contact-me",
  };

  if (args.length === 0) {
    const availableDestinations = Object.keys(navMapping);
    return `Control the nav bar with this command!\n\nUsage: nav ${angLt}destination${angGt}\n\nAvailable destinations:\n${availableDestinations.map((dest) => `- ${dest}`).join("\n")}`;
  }

  const destination = args[0].toLowerCase();
  const testId = navMapping[destination];
  if (!testId) {
    return `<span class="error-message">Invalid navigation destination: ${destination}</span>`;
  }

  const element = document.querySelector(
    `[data-testid="${testId}"]`
  ) as HTMLElement;
  if (element) {
    element.click();
    return `Navigating to ${destination}...`;
  } else {
    return `<span class="error-message">Could not find navigation element for: ${destination}</span>`;
  }
};

const socialsCmd: CommandAction = (args) => {
  if (args.length < 2) {
    return `Get my social links or directly redirect to them!\n\nUsage: socials [-g | --get-link]  [-r | --redirect] ${angLt}social_name${angGt}\n\nAvailable socials:\n${socialLinks
      .map(({ name }) => `- ${name.toLowerCase().split(" ")[0]}`)
      .join("\n")}`;
  }

  const flag = args[0];
  const socialName = args[1].toLowerCase();
  const social = socialLinks.find(
    (link) => link.name.toLowerCase() === socialName
  );

  if (!social) {
    return `<span class="error-message">Invalid social media name: ${socialName}</span>`;
  }

  if (["-g", "--get-link"].includes(flag)) {
    return `<a href="${social.url}" target="_blank" rel="noopener noreferrer" class="console-link">${social.url}</a>`;
  } else if (["-r", "--redirect"].includes(flag)) {
    const element = document.getElementById(`social-${socialName}`);
    if (element) {
      element.click();
      return `Redirecting to ${socialName}...`;
    } else {
      return `<span class="error-message">Could not find social link for: ${socialName}</span>`;
    }
  } else {
    return `<span class="error-message">Invalid flag: ${flag}. Use <span class="console-flag">-g</span> to get the link or <span class="console-flag">-r</span> to redirect.</span>`;
  }
};

export const cmdActions: Record<string, CommandAction> = {
  help: () => helpString,
  clear: () => null,
  ls: lsAction,
  cd: cdCmd,
  exit: exitCmd,
  nav: navCmd,
  socials: socialsCmd,
};

export const pageLs: {
  "portfolio/": {
    "/": (LsFileEntry | LsDirEntry)[];
    "/projects": LsDirEntry[];
    "/projects/:name": LsFileEntry[];
    "/about-me": LsFileEntry[];
  };
} = {
  "portfolio/": {
    "/": [
      {
        name: "about-me.sh",
        type: "file",
        scrollId: "about-me",
      },
      {
        name: "tech-stack.sh",
        type: "file",
        scrollId: "tech-stack",
      },
      {
        name: "projects.sh",
        type: "file",
        scrollId: "projects",
      },
      {
        name: "more-about-me",
        type: "dir",
        path: "/about-me",
      },
      ...(projectsInfos.slice(0, 4).map((project) => ({
        name: project.title.toLowerCase().split(" ").join("-"),
        type: "dir",
        path: `/projects/${project.to}`,
      })) as LsDirEntry[]),
      {
        name: "all-projects",
        type: "dir",
        path: "/projects",
      },
    ],
    "/projects": projectsInfos.map((project) => ({
      name: project.title.toLowerCase().split(" ").join("-"),
      type: "dir",
      path: `/projects/${project.to}`,
    })),
    "/projects/:name": [
      {
        name: "previous-project.sh",
        type: "file",
        clickSelector: "#prev-project-link",
      },
      {
        name: "next-project.sh",
        type: "file",
        clickSelector: "#next-project-link",
      },
    ],
    "/about-me": [
      {
        name: "read-more.sh",
        type: "file",
        clickSelector: "#read-more-button",
      },
    ],
  },
};

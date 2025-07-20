import { projectsInfos } from "../../ProjectsInfos";

const globalCommands = ["help", "clear", "ls", "cd", "exit"];

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
  if (args.length === 0) return "Usage: cd <directory>";

  const target = args[0];

  if (target.startsWith("..")) {
    const currentPath = window.location.pathname.replace("/portfolio", "") || "/";
    if (currentPath === "/")
      return `<span class="error-message">cd: No such file or directory: ${target}</span>`;
    const pathSegments = currentPath.split("/").filter((segment) => segment);
    const upLevels = (target.match(/\.\./g) || []).length;

    if (upLevels > pathSegments.length) {
      return `<span class="error-message">cd: No such file or directory: ${target}</span>`;
    }

    const newPathSegments = pathSegments.slice(0, -upLevels);
    const newPath = `/${newPathSegments.join("/")}`;
    navigate(`/portfolio${newPath}`);
    return `Navigating to ${newPath}`;
  }

  const currentPath = window.location.pathname.replace("/portfolio", "");
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
  return `<span class="error-message">cd: No such file or directory: ${target}</span>`;
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
  } else {
    // If no specific route content, check the global "*" entry
    const globalContent = pageLs["*"];
    if (globalContent) {
      itemsToDisplay = [globalContent]; // Wrap the single object in an array
    } else {
      return "Invalid path or no content to display.";
    }
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

export const cmdActions: Record<string, CommandAction> = {
  help: () => helpString,
  clear: () => null,
  ls: lsAction,
  cd: cdCmd,
  exit: exitCmd,
};

export const pageLs: {
  "*": LsFileEntry;
  "portfolio/": {
    "/": (LsFileEntry | LsDirEntry)[];
    "/projects": LsDirEntry[];
    "/projects/:name": LsFileEntry[];
    "/about-me": LsFileEntry[];
  };
} = {
  "*": {
    name: "contact-me.sh",
    type: "file",
    scrollId: "contact-me",
  },
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

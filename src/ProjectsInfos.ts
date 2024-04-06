export const projectsInfos: {
  readonly title: string;
  readonly img: string;
  readonly desc: string;
  readonly to: string;
  readonly repoClient: string;
  readonly repoServer?: string;
  readonly live?: string;
}[] = [
  {
    title: "VBOSS",
    img: "VBOSS",
    desc: `VBOSS (Veratroniks Back Office Support System) is a web application for Veratroniks which helps them to keep a track of their projects from the Enquiry stage to final stage. This was built to reduce the manual effort and have a structured format to store the data and have a much simpler approach to view the status of each project.`,
    to: "VBOSS",
    repoClient: "https://github.com/paturikaustubh/vboss-client",
    repoServer: "https://github.com/paturikaustubh/vboss-server",
  },
  {
    title: "Exam Branch Portal",
    img: "Exam Branch Portal",
    desc: `Built for my college's exam branch, this web app helps exam branch staff and students by making payment for exam fee much easier and simpler. This significantly reduced the total time from minimum of 15 min to maximum of 5 min. This application even records the data of the student's academic performances and the exams that they have registered for. All the information can be accessed right from the application itself.`,
    to: "exam-branch-portal",
    repoClient: "https://github.com/paturikaustubh/ExamBranch-Client",
    repoServer: "https://github.com/paturikaustubh/ExamBranch-Server",
  },
  {
    title: "FlikiPedia",
    img: "Flikipedia",
    desc: "FlikiPedia is an IMDb clone app where the users can view details about their favourite movie(s)/web series all at one place. All the data is fetched from TMDB (using their API endpoints) for a reliable and genuine information.",
    to: "FlikiPedia",
    repoClient: "https://github.com/paturikaustubh/flikipedia",
    live: "https://paturikaustubh.github.io/flikipedia/",
  },
  {
    title: "Wok of Fame",
    img: "Wok of Fame",
    desc: "This is a website idea built for a restraunt Wok of Fame. Here the customers can order their favourite food item from the restraunt directly from the app, which will be home delivered to them. This application also allows the customers to reserve/pre-book a table for a specific date and time. They can also place an order for the items they'd want to have when they arrive at the restraunt.",
    to: "wok-of-fame",
    repoClient: "https://github.com/paturikaustubh/wok-of-fame",
    live: "https://paturikaustubh.github.io/wok-of-fame/",
  },
  {
    title: "React Carousel",
    img: "Carousel",
    desc: "This is a simple yet unique carousel built in React for showing off your images in your/any website. It's unique UX differentiates it from most of the carousels out there.",
    to: "react-carousel",
    repoClient: "https://github.com/paturikaustubh/react-carousel",
    live: "https://paturikaustubh.github.io/react-carousel/",
  },
];

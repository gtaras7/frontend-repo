// Synthetic sidebar identity until NestJS provides a session endpoint.
const name = "Eleni Papadopoulou";

export const demoShellUser = {
  name,
  initials: name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join(""),
};

//Designation rolling transition
const roles = [
  "Software Engineer",
  "EduTech Developer",
  "Coding Educator",
  "Tech Mentor"
];

let index = 0;
const roleText = document.getElementById("role-text");

setInterval(() => {
  roleText.classList.remove("fade-in");
  roleText.classList.add("fade-out");

  setTimeout(() => {
    index = (index + 1) % roles.length;
    roleText.textContent = roles[index];

    roleText.classList.remove("fade-out");
    roleText.classList.add("fade-in");
  }, 600);

}, 2500);



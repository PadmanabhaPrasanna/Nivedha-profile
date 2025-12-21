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

//Form input taking
document.getElementById("form").addEventListener("submit", frontSubmit);
function frontSubmit(e)
{
    e.preventDefault(); //To prevent req.url: /? which caused trouble

    const Name = document.getElementById("Name").value;
    const Country = document.getElementById("Country").value;
    const Mail = document.getElementById("Mail").value;
    const Message = document.getElementById("Message").value;

    const saveObj = {Name: Name, Country: Country, Mail: Mail, Message: Message};
    console.log(saveObj);

    
    fetch("/saveform", {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(saveObj)})
    .then(res => res.text())
    .then(msg => 
        { 
             console.log("Server says: "+msg); 

             const modal = new bootstrap.Modal(document.getElementById("ModalSuccess"));
             modal.show();
             document.getElementById("form").reset();
   
        })
    .catch(err => alert("Server says: "+err));


}



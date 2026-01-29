//login authentication part
document.getElementById("loginform").addEventListener("submit", loginfunk);
function loginfunk(e) {
    e.preventDefault();
    const userEmail = document.getElementById("useremail").value;
    const userPwd = document.getElementById("userpwd").value;
    const loginObj = {Email: userEmail, Password: userPwd};
    //console.log(loginObj);

    fetch("/loginauthentication", {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(loginObj)})
    .then(res => { return res.json() })
    .then(data => 
        {  
             console.log("front end says: S "+data); 
             localStorage.setItem("token", data.token);
             window.location.href = "/dashboard.html";
             document.getElementById("loginform").reset();
   
        })
    .catch(err => 
        {
             console.log("front end says: F "+err); 
             
        });


}
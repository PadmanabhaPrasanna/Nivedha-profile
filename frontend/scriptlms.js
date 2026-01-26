
//Register page: extension auto.
document.getElementById("regcountry").addEventListener("input", showextension);
function showextension() {
const counPhoneMap = { "Afghanistan":"+93","Albania":"+355","Algeria":"+213","Andorra":"+376","Angola":"+244","Antigua and Barbuda":"+1-268","Argentina":"+54","Armenia":"+374","Australia":"+61","Austria":"+43","Azerbaijan":"+994","Bahamas":"+1-242","Bahrain":"+973","Bangladesh":"+880","Barbados":"+1-246","Belarus":"+375","Belgium":"+32","Belize":"+501","Benin":"+229","Bhutan":"+975","Bolivia":"+591","Bosnia and Herzegovina":"+387","Botswana":"+267","Brazil":"+55","Brunei":"+673","Bulgaria":"+359","Burkina Faso":"+226","Burundi":"+257","Cambodia":"+855","Cameroon":"+237","Canada":"+1","Cape Verde":"+238","Central African Republic":"+236","Chad":"+235","Chile":"+56","China":"+86","Colombia":"+57","Comoros":"+269","Congo":"+242","Costa Rica":"+506","Croatia":"+385","Cuba":"+53","Cyprus":"+357","Czech Republic":"+420","Denmark":"+45","Djibouti":"+253","Dominica":"+1-767","Dominican Republic":"+1-809","Ecuador":"+593","Egypt":"+20","El Salvador":"+503","Equatorial Guinea":"+240","Eritrea":"+291","Estonia":"+372","Eswatini":"+268","Ethiopia":"+251","Fiji":"+679","Finland":"+358","France":"+33","Germany":"+49","Greece":"+30","India":"+91","Indonesia":"+62","Ireland":"+353","Israel":"+972","Italy":"+39","Japan":"+81","Malaysia":"+60","Netherlands":"+31","New Zealand":"+64","Norway":"+47","Pakistan":"+92","Philippines":"+63","Portugal":"+351","Qatar":"+974","Saudi Arabia":"+966","Singapore":"+65","South Africa":"+27","South Korea":"+82","Spain":"+34","Sri Lanka":"+94","Sweden":"+46","Switzerland":"+41","Thailand":"+66","United Arab Emirates":"+971","United Kingdom":"+44","United States":"+1","Vietnam":"+84","Zimbabwe":"+263" };
const couninput = document.getElementById("regcountry").value;

for (const [country, code] of Object.entries(counPhoneMap)) {
    if (couninput == country)
    {
        document.getElementById("regext").value = code;
        console.log(country, code);
    }
}
}

//Submitting register form.
document.getElementById("registerform").addEventListener("submit", regsubmit);
function regsubmit(e) {
    e.preventDefault();
    const Regname = document.getElementById("regname").value;
    const Regemail = document.getElementById("regemail").value;
    const Regcountry = document.getElementById("regcountry").value;
    const Regext = document.getElementById("regext").value;
    const Regphone = document.getElementById("regphone").value;
    const Regpwd = document.getElementById("regpwd").value;
    const Regconfirmpwd = document.getElementById("regconfirmpwd").value;

    //Form authentication part
    const phoneRegex = /^\d{0,10}$/;
    if (!phoneRegex.test(Regphone)) {
        alert("Phone number must have 10 digits");
        return;
    }
    if (Regpwd !== Regconfirmpwd) {
        alert("Passwords do not match");
        return;
    }


    const regObj = {Name: Regname, Email: Regemail, Country: Regcountry, Extension: Regext, Phone: Regphone, Password: Regpwd};

    fetch("/saveregistrationform", {method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(regObj)})
    .then(res => { if (!res.ok){throw new Error("Failed to save form");} return res.text();})
    .then(msg => 
        {  
             console.log("Server says: S "+msg); 
             const modalS = new bootstrap.Modal(document.getElementById("ModalSuccess"));
             modalS.show();
             document.getElementById("registerform").reset();
   
        })
    .catch(err => 
        {
             console.log("Server says: F "+err); 
             const modalF = new bootstrap.Modal(document.getElementById("ModalFail"));
             modalF.show();

        });

    console.log(regObj);

}
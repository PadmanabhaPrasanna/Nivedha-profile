const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
//DB pass encryption
require("dotenv").config();
//password hashing
const bcrypt = require("bcrypt");
//jwt
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

//MongDB connect (copy pasted from mongDB site, delete disconnect)
//const uri = "mongodb+srv://nivedhaprasannaindia:4132231400@cluster1.pizbnnd.mongodb.net/?appName=Cluster1";

//DB pass encryption
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("From backend: MongDB connected");
  } 
  catch (err) {
    console.error(err);
  }
}
run();

//Creating schema for mongDB:
//"FormData is the name in which it will be stored in DB i.e FormDatas"
//Keep Name, Country, Mail, Message same as that of frontend JS.
//First part is index.html form schema
const formSchema = new mongoose.Schema({Name: String, Country: String, Mail: String, Message: String});
const formData = mongoose.model("FormData", formSchema);  
//This part is registerpage.html form schema
const regSchema = new mongoose.Schema({Name: String, Email: String, Country: String, Extension: String, Phone: String, Password: String});
const regData = mongoose.model("RegistrationData",regSchema);



/* This part serves all static files*/
app.use(express.static(path.join(__dirname, "/frontend")));


/* Parses form data - meaning converts string data to json */
app.use(express.json({limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
/* Saves index.html form data in DB */
app.post("/saveform", async (req, res) => {
  try { 
    const newEntry = new formData(req.body);
    await newEntry.save();
    res.send("Saved in DB");
  } catch (err) {
    res.status(500).send("Failed to save");
  } 
});

/* Saves registration details in DB */
app.post("/saveregistrationform", async (req,res) => {
  try {
    const regEntry = new regData(req.body);
    //console.log(regEntry);
    //console.log(regEntry.Password);
    regEntry.Password = await bcrypt.hash(regEntry.Password, 10);
    //console.log(regEntry.Password);

    await regEntry.save();
    res.send("Saved in DB")
  } catch (err) {
    res.status(500).send("Failed to save");
  }
});

/* Login authentication */
app.post("/loginauthentication", async (req,res)=> {
  try {
    //login inputs at loginInp:
    const loginInp = req.body;
    //console.log(loginInp);
    //console.log(loginInp.Email);

    //See if that mail ID exist:
    const User = await regData.findOne({Email: loginInp.Email });
    if (!User) {
      return res.status(401).send("DB says: User not found");
    }

    //Check password:
    const passwordMatch = await bcrypt.compare(loginInp.Password, User.Password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    //create JWT important
    const token = jwt.sign({userID: User._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.json({token});

    //Success:
    //res.send("Login successful");

  }
  catch (err) {
    res.status(500).send("Login failed");

  }
});

app.listen(PORT, ()=> {console.log(`server running on http://localhost:${PORT}`)});


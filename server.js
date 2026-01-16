const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

//since public folder added, this file might not work. Use only for reference.
//MongDB connect (copy pasted from mongDB site, delete disconnect)
const uri = "mongodb+srv://nivedhaprasannaindia:4132231400@cluster1.pizbnnd.mongodb.net/?appName=Cluster1";
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
const formSchema = new mongoose.Schema({Name: String, Country: String, Mail: String, Message: String});
const formData = mongoose.model("FormData", formSchema);  



//SERVING AREA:
const server = http.createServer((req,res)=> {
     //testing logger for req.url and req.method:
    console.log("req.url: " + req.url +"\n"+ "req.method " + req.method + "\n");

    //index.html serve:
    if(req.method=="GET" && req.url=="/")
    {
        let pathway = path.join(__dirname, "index.html");
        fs.readFile(pathway, "utf8", (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("From backend: Failed to load index.html"+err);
            }
            else
            {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            }
        });
        return;
    }
     //loginpage.html serve
    else if(req.method=="GET" && req.url=="/loginpage.html")
    {
        let pathway = path.join(__dirname, "loginpage.html");
        fs.readFile(pathway, "utf8", (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("From backend: Failed to load loginpage.html"+err);
            }
            else
            {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            }
        });
        return;
    }

    //CSS serve:
    else if (req.method == "GET" && req.url == "/styles.css")
    {
        let pathway = path.join(__dirname, "styles.css");
        fs.readFile(pathway, (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end(console.log("From backend: Failed to load styles.css"+err)); //This logger will show in backend terminal
            }
            else
            {
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            }
        });
        return;
    }
    
    //logo.png serve:
    else if (req.method == "GET" && req.url == "/logo.png")
    {
        let pathway = path.join(__dirname, "logo.png");
        fs.readFile(pathway, (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end(console.log("From backend: Failed to load logo.png"+err)); //This logger will show in backend terminal
            }
            else
            {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.end(data);
            }
        });
        return;
    }

    //profilephoto.png serve:
    else if (req.method == "GET" && req.url == "/profilephoto.png")
    {
        let pathway = path.join(__dirname, "profilephoto.png");
        fs.readFile(pathway, (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end(console.log("From backend: Failed to load profilephoto.png"+err)); //This logger will show in backend terminal
            }
            else
            {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.end(data);
            }
        });
        return;
    }

    //JS serve:
    else if (req.method == "GET" && req.url == "/script.js")
    {
        let pathway = path.join(__dirname, "script.js");
        fs.readFile(pathway, (err,data)=> {
            if (err)
            {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end(console.log("From backend: Failed to load script.js"+err)); //This logger will show in backend terminal
            }
            else
            {
                res.writeHead(200, {"Content-Type": "application/javascript"});
                res.end(data);
            }
        });
        return;
    }

    //Saving form data:
    else if (req.method == "POST" && req.url == "/saveform")
    {
        let body = '';
        req.on("data", chunk => body+=chunk);
        req.on("end", async () => {
            try{
                const data = JSON.parse(body);
                const newEntry = new formData(data);
                await newEntry.save();
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Saved in DB");
                console.log("From backend: Saved Successfully");
            }
            catch (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("Failed to save");
                console.log(err+"From backend: saving failed");
            }
        });
        return;
    }

    


    

    
});

server.listen(3000, ()=> {console.log("From backend: Server turned on successfully")})
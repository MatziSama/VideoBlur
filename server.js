const express = require("express");
const fs = require("fs")
const path = require("path")
const app = express();

app.use(express.static("home"));
app.use(express.static("video"));

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "home", "index.html"))
})

app.get("/video", (req, res) => {
    res.sendFile(path.join(__dirname, "video", "index.html"));
})

app.get("/sources", (req, res) => {
    fs.readdir(path.join(__dirname, "sources"), (err, files) => {
        res.send(files);
    })
})

app.get("/sources/:name", (req, res) => {
    const name = req.params;
    res.sendFile(path.join(__dirname, "sources", name.name))
})

app.get("/upload", (req, res) => {
    
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})

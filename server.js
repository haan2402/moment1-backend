/**
 * Kurser
 */
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

//ansluter till databasen
const db = new sqlite3.Database("./db/courses.db");

//inställningar
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//routing index sidan
app.get("/", (req, res) => {
    res.render("index");
});

//routing addcourse sidan
app.get("/addcourse", (req, res) => {
    res.render("addcourse");
});

//routing about sidan
app.get("/about", (req, res) => {
    res.render("about");
});



// startar applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});
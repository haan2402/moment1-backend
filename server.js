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

//routing index sidan, och skriver ut lagrade kurser
app.get("/", (req, res) => {
    //Läs ut befintliga kurser i fallande ordning
    db.all("SELECT * FROM courses ORDER BY id DESC;", (err, rows) => {
        if(err) {
            console.error(err.message);
        }

        res.render("index", {
            error: "",
            rows: rows
        });
    });
});

//routing addcourse sidan
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        error: ""
    });
});

//skapa ny kurs via formulär
app.post("/addcourse", (req, res) => {
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let syllabus = req.body.syllabus;
    let progression = req.body.progression;

    //gör en kontroll att alla fält fylls i till formuläret, annars returneras error och meddelande
    if(!coursecode || !coursename || !syllabus || !progression) {
        const error = "Alla fält måste fyllas i!";
        return res.render("addcourse", { error }); 
    } 

    const course = db.prepare("INSERT INTO courses(coursecode, coursename, syllabus, progression)VALUES(?, ?, ?, ?)");
    course.run(coursecode, coursename, syllabus, progression);

    res.redirect("/");

    course.finalize();
});

//för att radera kurs från lista
app.get("/delete/:id", (req, res) => {
    let id = req.params.id;
});

//routing about sidan
app.get("/about", (req, res) => {
    res.render("about");

    //raderar kurs
    db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
        if(err) {
            console.error(err.message);
        }

        //tillbaka till startsidan
        res.redirect("/");
    });
});


// startar applikationen
app.listen(port, () => {
    console.log("Started on port: " + port);
});
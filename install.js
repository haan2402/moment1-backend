/**
 * Install-script för att lägga till kurser och läsa de
 */
const sqlite3 = require("sqlite3").verbose();

//skapar databas
const db = new sqlite3.Database("./db/courses.db");

//skapa tabell (id, kurskod, kursnamn, syllabus, progression, datum)
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses;");

    db.run(`
        CREATE TABLE courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        coursecode TEXT NOT NULL,
        coursename TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL,
        course_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
    `);
});

db.close(); 
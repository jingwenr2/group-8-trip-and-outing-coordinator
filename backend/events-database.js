import sqlite3 from "sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataDirectory = path.join(__dirname, "data");

//const dataDirectory = join(import.meta.dirname, "data");
mkdirSync(dataDirectory, { recursive: true });

//const database = new sqlite3.Database(join(dataDirectory, "events.sqlite"));
const databasePath = join(dataDirectory, "events.sqlite");

//test
console.log("Database location:", databasePath);

const database = new sqlite3.Database(databasePath, (error) => {
    if (error) {
        console.error("Database connection error:", error);
    } else {
        console.log("Database connected successfully!");
    }
});

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.run(sql, params, function (error) {
            if (error) reject(error);
            else resolve(this);
        });
    });
}

function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.get(sql, params, (error, row) => (error ? reject(error) : resolve(row)));
    });
}

function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.all(sql, params, (error, rows) => (error ? reject(error) : resolve(rows)));
    });
}

const databaseReady = (async () => {
    // SQLite does not enforce foreign keys unless this is turned on (per connection)
    await run("PRAGMA foreign_keys = ON");

    await run(`CREATE TABLE IF NOT EXISTS event (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        location TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL
    )`);

    await run(`CREATE TABLE IF NOT EXISTS activity (
        activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        start_time TEXT,
        description TEXT,
        FOREIGN KEY (event_id) REFERENCES event (event_id) ON DELETE CASCADE
    )`);

    await run("CREATE INDEX IF NOT EXISTS idx_activity_event_id ON activity (event_id)");
})();

export async function saveEvent(eventName, eventDate, eventLocation, eventCategory, eventDescription) {
    await databaseReady;
    const result = await run(
        "INSERT INTO event (name, date, location, category, description) VALUES (?, ?, ?, ?, ?)",
        [eventName, eventDate, eventLocation, eventCategory, eventDescription],
    );
    return result.lastID;
}

export async function getEvent(id) {
    await databaseReady;
    return get("SELECT * FROM event WHERE event_id = ?", [id]);
}

export async function saveActivity(eventId, activityName, startTime, activityDescription) {
    await databaseReady;
    const result = await run(
        `INSERT INTO activity (event_id, name, start_time, description)
         VALUES (?, ?, ?, ?)`,
        [eventId, activityName, startTime, activityDescription],
    );
    return result.lastID;
}

export async function getActivitiesForEvent(eventId) {
    await databaseReady;
    return all(
        "SELECT * FROM activity WHERE event_id = ? ORDER BY start_time",
        [eventId],
    );
}
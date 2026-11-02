import express from 'express';
import { getEvent, saveEvent, saveActivity, getActivitiesForEvent } from '../events-database.js';

//import 'dotenv/config';

const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//creates placeholder events and activities

router.get('/events', async (req, res) => {
    let name = "EventA";
    let date = "2024-06-01";
    let location = "LocationA";
    let category = "CategoryA";
    let description = "DescriptionA";
    const eventId = await saveEvent(name, date, location, category, description);
    res.status(201).json({ eventId });
});

router.get('/events1', async (req, res) => {
    let name = "EventA";
    let time = "10:00";
    let description = "DescriptionA";
    const eventId = await saveActivity(1, name, time, description);
    res.status(201).json({ activityId: eventId });
});

router.get('/map', (req, res) => {
    res.render('map', { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY });
});

router.get('/advmap', (req, res) => {
    res.render('auto_map', { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY});
});

export default router;

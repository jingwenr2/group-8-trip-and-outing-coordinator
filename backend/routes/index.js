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

//https://developers.google.com/maps/documentation/places/web-service/place-autocomplete?apix_params=%7B%22fields%22%3A%22*%22%2C%22resource%22%3A%7B%22input%22%3A%22Amoeba%22%2C%22locationRestriction%22%3A%7B%22circle%22%3A%7B%22center%22%3A%7B%22latitude%22%3A37.7937%2C%22longitude%22%3A-122.3965%7D%2C%22radius%22%3A5000%7D%7D%7D%7D


export default router;

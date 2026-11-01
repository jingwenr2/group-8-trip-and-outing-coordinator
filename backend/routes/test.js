//Test route to create something in the database
import express from 'express';
import { getEvent, saveEvent, saveActivity, getActivitiesForEvent } from '../events-database.js';

const router = express.Router();

//something didn't work so I moved it into index.js for now
//did not end up testing these and ended up opening up the events.sqlite in the db browser he recommended to us

router.get('/events/:id', async (req, res) => {
    try {
        const event = await getEvent(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/events/:id/activities', async (req, res) => {
    try {
        const activities = await getActivitiesForEvent(req.params.id);
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./AuthPages/Login";
import Events from "./EventsPages/Events";
import EventDetails from "./EventsPages/EventDetails";
import AddNewEvent from "./EventsPages/AddNewEvent";

import { events as initialEvents } from "./data/events";

function App() {
  const [events, setEvents] = useState(initialEvents);

  function addEvent(newEvent) {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/events"
        element={<Events events={events} />}
      />

      <Route
        path="/events/new"
        element={<AddNewEvent onCreateEvent={addEvent} />}
      />

      <Route
        path="/events/:id"
        element={<EventDetails events={events} />}
      />
    </Routes>
  );
}

export default App;
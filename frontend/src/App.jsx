
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";

import Events from "./EventsPages/Events";
import EventDetails from "./EventsPages/EventDetails";
import AddNewEvent from "./EventsPages/AddNewEvent";

import ProfilePage from "./ProfilePage/ProfilePage";

import { events as initialEvents } from "./data/events";

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [profile, setProfile] = useState(null);

  function addEvent(newEvent) {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  function handleSignup(newProfile) {
    setProfile(newProfile);
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/signup"
        element={<Signup onSignup={handleSignup} />}
      />

      <Route
        path="/profile"
        element={
          <ProfilePage
            events={events}
            initialProfile={profile}
          />
        }
      />

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

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

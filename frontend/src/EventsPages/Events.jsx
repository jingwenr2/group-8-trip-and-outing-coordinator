import { useNavigate, Link } from "react-router-dom";
import { events as defaultEvents } from "../data/events";
import "./Events.css";

function Events({ events = defaultEvents }) {
  const navigate = useNavigate();

  return (
    <main className="events-page">
      <header className="events-header">
        <div>
          <h1>My Events</h1>
          <p>Plan something fun with your friends.</p>
        </div>

        <button
          className="create-button"
          onClick={() => navigate("/events/new")}
        >
          + Add New Event
        </button>
      </header>

      <section className="event-list">
        {events.map((event) => (
          <Link
            to={`/events/${event.id}`}
            className="event-card"
            key={event.id}
          >
            <span className="event-category">
              {event.category}
            </span>

            <h2>{event.name}</h2>

            <p>{event.description}</p>

            <div className="event-details">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Events;
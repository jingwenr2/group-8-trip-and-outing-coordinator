
import { useNavigate, Link } from "react-router-dom";
import { events as defaultEvents } from "../data/events";
import "./Events.css";

function Events({ events = defaultEvents }) {
  const navigate = useNavigate();

  // Format event date
  function formatDate(date) {
    if (!date) return "";

    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00`)
      : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <main className="events-page">
      {/* Page Header */}
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

      {/* Event Cards */}
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

            {/* Event Date and Location */}
            <div className="event-details">
              <span>📅 {formatDate(event.date)}</span>
              <span>📍 {event.location}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Events;

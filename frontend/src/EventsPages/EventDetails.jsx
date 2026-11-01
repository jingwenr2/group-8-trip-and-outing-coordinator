
import { useParams, Link } from "react-router-dom";
import { events as defaultEvents } from "../data/events";
import "./Events.css";

function EventDetails({ events = defaultEvents }) {
  const { id } = useParams();

  const event = events.find(
    (event) => event.id === Number(id)
  );

  // Format event date
  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (!event) {
    return (
      <main className="event-details-page">
        <h1>Event not found</h1>
        <Link to="/events">Back to Events</Link>
      </main>
    );
  }

  return (
    <main className="event-details-page">
      <Link to="/events" className="back-button">
        ← Back to Events
      </Link>

      <h1>{event.name}</h1>

      <span className="event-category">
        {event.category}
      </span>

      <p>{event.description}</p>

      <div className="event-details">
        <p>📅 {formatDate(event.date)}</p>
        <p>📍 {event.location}</p>
      </div>

      <section className="itinerary-section">
        <h2>Event Itinerary</h2>

        {!event.activities || event.activities.length === 0 ? (
          <p className="empty-itinerary">
            No activities have been added to this event yet.
          </p>
        ) : (
          <div className="activity-list">
            {event.activities.map((activity) => (
              <article
                className="activity-card"
                key={activity.id}
              >
                <span className="activity-time">
                  {new Date(
                    `2000-01-01T${activity.time}`
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>

                <div>
                  <h3>{activity.name}</h3>

                  {activity.description && (
                    <p>{activity.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default EventDetails;

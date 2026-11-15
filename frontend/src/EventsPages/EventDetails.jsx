
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
    if (!date) return "";

    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00`)
      : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Format activity time
  function formatTime(time) {
    if (!time) return "";

    return new Date(
      `2000-01-01T${time}`
    ).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
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
      {/* Back Button */}
      <Link to="/events" className="back-button">
        ← Back to Events
      </Link>

      {/* Event Information */}
      <h1>{event.name}</h1>

      <span className="event-category">
        {event.category}
      </span>

      <p>{event.description}</p>

      <div className="event-details">
        <p>📅 {formatDate(event.date)}</p>
        <p>📍 {event.location}</p>
      </div>

      {/* Event Itinerary */}
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
                  {formatTime(activity.time)}
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

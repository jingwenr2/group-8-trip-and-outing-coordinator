
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddNewEvent.css";

const categories = [
  "Food",
  "Outdoors",
  "Culture",
  "Entertainment",
  "Shopping",
  "Other",
];

function AddNewEvent({ onCreateEvent }) {
  const navigate = useNavigate();

  // Event details
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "Other",
    description: "",
  });

  // Itinerary activities
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [showActivityForm, setShowActivityForm] = useState(false);

  // Update event details
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Add activity to itinerary
  function addActivity() {
    if (!activityName.trim() || !startTime) {
      return;
    }

    const newActivity = {
      id: Date.now(),
      name: activityName.trim(),
      time: startTime,
      description: activityDescription.trim(),
    };

    setActivities((prevActivities) =>
      [...prevActivities, newActivity].sort((a, b) =>
        a.time.localeCompare(b.time)
      )
    );

    setActivityName("");
    setStartTime("");
    setActivityDescription("");
    setShowActivityForm(false);
  }

  // Remove activity
  function removeActivity(activityId) {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== activityId)
    );
  }

  // Create event
  function handleSubmit(e) {
    e.preventDefault();

    const newEvent = {
      ...formData,
      id: Date.now(),
      activities,
    };

    onCreateEvent(newEvent);
    navigate(`/events/${newEvent.id}`);
  }

  // Format activity time
  function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="create-event-page">

      {/* Page Header */}
      <Link to="/events" className="back-button">
        ← Back to Events
      </Link>

      <header className="create-event-header">
        <span className="create-event-eyebrow">GROUPGO PLANNER</span>
        <h1>Create an Event</h1>
        <p>Bring your group together and plan something fun.</p>
      </header>

      <form className="event-form" onSubmit={handleSubmit}>

        {/* EVENT DETAILS */}
        <section className="event-form-section">
          <div className="form-section-heading">
            <span className="section-number">01</span>
            <div>
              <h2>Event Details</h2>
              <p>Start with the basics of your event.</p>
            </div>
          </div>

          <div className="form-fields">

            <div className="form-field">
              <label htmlFor="name">Event Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Weekend Brunch"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-field">
                <label htmlFor="date">Date *</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Brooklyn, NY"
                  required
                />
              </div>

            </div>

            {/* CATEGORY */}
            <div className="form-field">
              <label>Choose a Category *</label>

              <div className="category-options">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`category-option ${
                      formData.category === category ? "selected" : ""
                    }`}
                    aria-pressed={formData.category === category}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category,
                      }))
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell everyone what this event is about..."
                rows="3"
              />
              <span className="field-hint">
                Add a few details to get everyone excited!
              </span>
            </div>

          </div>
        </section>

        {/* ITINERARY */}
        <section className="itinerary-section create-itinerary-section">

          <div className="form-section-heading">
            <span className="section-number">02</span>
            <div>
              <h2>Build Your Itinerary</h2>
              <p>What will your group be doing?</p>
            </div>
          </div>

          {/* ACTIVITY LIST */}
          {activities.length === 0 ? (
            <div className="empty-itinerary">
              <div className="empty-itinerary-icon">✦</div>
              <h3>Your itinerary starts here</h3>
              <p>
                Add activities to organize your event and keep everyone
                on the same page.
              </p>
            </div>
          ) : (
            <div className="activity-list">
              {activities.map((activity, index) => (
                <article className="activity-card" key={activity.id}>
                  <div className="activity-number">
                    {index + 1}
                  </div>

                  <div className="activity-time">
                    {formatTime(activity.time)}
                  </div>

                  <div className="activity-info">
                    <h3>{activity.name}</h3>
                    {activity.description && (
                      <p>{activity.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="remove-activity-button"
                    onClick={() => removeActivity(activity.id)}
                    aria-label={`Remove ${activity.name}`}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* ADD ACTIVITY BUTTON */}
          {!showActivityForm && (
            <button
              type="button"
              className="add-activity-button"
              onClick={() => setShowActivityForm(true)}
            >
              + Add Activity
            </button>
          )}

          {/* NEW ACTIVITY FORM */}
          {showActivityForm && (
            <div className="activity-form">

              <div className="activity-form-heading">
                <h3>Add an Activity</h3>
                <p>Enter the details for this part of your event.</p>
              </div>

              <div className="form-field">
                <label htmlFor="activity-name">Activity Name *</label>
                <input
                  id="activity-name"
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="e.g. Meet for brunch"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="activity-time">Start Time *</label>
                <input
                  id="activity-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="activity-description">
                  Description (Optional)
                </label>
                <textarea
                  id="activity-description"
                  value={activityDescription}
                  onChange={(e) =>
                    setActivityDescription(e.target.value)
                  }
                  placeholder="Add more details about this activity..."
                  rows="2"
                />
              </div>

              <div className="activity-form-actions">
                <button
                  type="button"
                  className="cancel-activity-button"
                  onClick={() => setShowActivityForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="create-button"
                  disabled={!activityName.trim() || !startTime}
                  onClick={addActivity}
                >
                  Add to Itinerary
                </button>
              </div>

            </div>
          )}
        </section>

        {/* CREATE EVENT */}
        <div className="create-event-footer">
          <p>Ready to bring everyone together?</p>
          <button type="submit" className="create-event-submit">
            Create Event →
          </button>
        </div>

      </form>
    </main>
  );
}

export default AddNewEvent;

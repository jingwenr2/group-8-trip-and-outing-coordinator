
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { events as defaultEvents } from "../data/events";
import NavigationBar from "../NavigationTab/NavigationTab";
import "./ProfilePage.css";

function Profile({ events = defaultEvents }) {
  const navigate = useNavigate();

  // Profile information
  const [profile, setProfile] = useState({
    name: "Your Name",
    age: "",
    preferences: ["Food", "Outdoors", "Travel"],
    photo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const availablePreferences = [
    "Food",
    "Outdoors",
    "Travel",
    "Culture",
    "Entertainment",
    "Shopping",
    "Sports",
    "Nightlife",
  ];

  // Update profile information
  function handleProfileChange(e) {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Update selected preferences
  function togglePreference(preference) {
    setEditForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((item) => item !== preference)
        : [...prev.preferences, preference],
    }));
  }

  // Save profile changes
  function saveProfile(e) {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  }

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

  // Find events happening this month
  const today = new Date();

  const upcomingEvents = events
    .filter((event) => {
      if (!event.date) return false;

      const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(event.date)
        ? new Date(`${event.date}T00:00:00`)
        : new Date(event.date);

      if (Number.isNaN(eventDate.getTime())) return false;

      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T00:00:00`);
      const dateB = new Date(`${b.date}T00:00:00`);
      return dateA - dateB;
    })
    .slice(0, 5);

  return (
    <>
      <NavigationBar />
      <main className="profile-page">

      {/* Page Header */}
      <header className="profile-header">
        <div>
          <span className="profile-eyebrow">YOUR GROUPGO ACCOUNT</span>
          <h1>My Profile</h1>
        </div>
      </header>

      {/* PROFILE CARD */}
      <section className="license-card">

        <div className="license-header">
          <div>
            <h2>GROUPGO</h2>
            <p>ADVENTURE CARD</p>
          </div>

          <span className="license-symbol">✦</span>
        </div>

        <div className="license-body">

          <div className="profile-photo">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" />
            ) : (
              <span>👤</span>
            )}
          </div>

          <div className="profile-information">

            <div className="profile-info-field">
              <span>NAME</span>
              <h2>{profile.name}</h2>
            </div>

            <div className="profile-info-field">
              <span>AGE</span>
              <h3>{profile.age || "Not provided"}</h3>
            </div>

            <div className="profile-info-field">
              <span>MEMBER ID</span>
              <h3>GG-000001</h3>
            </div>

          </div>
        </div>

        <div className="license-preferences">
          <span>PREFERENCES</span>

          <div className="preference-tags">
            {profile.preferences.length > 0 ? (
              profile.preferences.map((preference) => (
                <span key={preference} className="preference-tag">
                  {preference}
                </span>
              ))
            ) : (
              <p>No preferences selected.</p>
            )}
          </div>
        </div>

        <div className="license-footer">
          <span>YOUR SOCIAL PLANNING IDENTITY</span>
          <strong>LET'S GO!</strong>
        </div>

      </section>

      {/* EDIT PROFILE */}
      <div className="profile-actions">
        <button
          className="edit-profile-button"
          onClick={() => {
            setEditForm(profile);
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Close Editor" : "Edit Profile"}
        </button>
      </div>

      {isEditing && (
        <section className="edit-profile-section">
          <h2>Edit Your Profile</h2>

          <form onSubmit={saveProfile}>

            <div className="profile-form-field">
              <label htmlFor="profile-name">Full Name</label>
              <input
                id="profile-name"
                name="name"
                type="text"
                value={editForm.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="profile-age">Age</label>
              <input
                id="profile-age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={editForm.age}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="profile-form-field">
              <label htmlFor="profile-photo">Profile Photo URL</label>
              <input
                id="profile-photo"
                name="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={editForm.photo}
                onChange={handleProfileChange}
              />
            </div>

            <div className="profile-form-field">
              <label>Choose Your Preferences</label>

              <div className="edit-preferences">
                {availablePreferences.map((preference) => (
                  <button
                    type="button"
                    key={preference}
                    className={
                      editForm.preferences.includes(preference)
                        ? "preference-option selected"
                        : "preference-option"
                    }
                    onClick={() => togglePreference(preference)}
                  >
                    {preference}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="save-profile-button">
              Save Changes
            </button>

          </form>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      <section className="upcoming-events-section">

        <div className="upcoming-events-header">
          <div>
            <span className="profile-eyebrow">YOUR PLANS</span>
            <h2>Upcoming Events</h2>
            <p>Here are your upcoming adventures this month.</p>
          </div>

          <Link to="/events" className="view-all-events">
            View All →
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="no-upcoming-events">
            <span>✦</span>
            <h3>No upcoming events yet</h3>
            <p>Start planning your next adventure with your friends!</p>

            <button
              onClick={() => navigate("/events/new")}
              className="create-button"
            >
              + Create an Event
            </button>
          </div>
        ) : (
          <div className="upcoming-events-list">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="upcoming-event-card"
                onClick={() => navigate(`/events/${event.id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/events/${event.id}`);
                  }
                }}
              >
                <div className="upcoming-event-date">
                  <span>
                    {new Date(
                      /^\d{4}-\d{2}-\d{2}$/.test(event.date)
                        ? `${event.date}T00:00:00`
                        : event.date
                    ).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>

                  <strong>
                    {new Date(
                      /^\d{4}-\d{2}-\d{2}$/.test(event.date)
                        ? `${event.date}T00:00:00`
                        : event.date
                    ).getDate()}
                  </strong>
                </div>

                <div className="upcoming-event-info">
                  <span className="upcoming-event-category">
                    {event.category}
                  </span>

                  <h3>{event.name}</h3>

                  <p>📍 {event.location}</p>
                </div>

                <div className="upcoming-event-arrow">
                  →
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      </main>
    </>
  );
}

export default Profile;

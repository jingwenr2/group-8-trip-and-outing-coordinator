
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

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

function Signup({ onSignup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferences: [],
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function togglePreference(preference) {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((item) => item !== preference)
        : [...prev.preferences, preference],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (formData.preferences.length === 0) {
      setError("Please select at least one preference.");
      return;
    }

    // Create the user's profile
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const newProfile = {
      id: Date.now(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      birthday: formData.birthday,
      email: formData.email.trim(),
      preferences: formData.preferences,
      photo: "",
    };

    // Send the new profile to App.jsx
    onSignup(newProfile);

    // Navigate to the new profile
    navigate("/profile");
  }

  return (
    <main className="auth-page">
      <section className="auth-card signup-card">

        <h1 className="brand-title">
          Join <span>GroupGo</span>
        </h1>

        <p className="auth-subtitle">
          Create your profile and start planning your next adventure.
        </p>

        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="8"
          />

          <div className="signup-preferences">
            <label>Choose Your Preferences</label>
            <p>Select the activities you're interested in.</p>

            <div className="signup-preference-options">
              {availablePreferences.map((preference) => (
                <button
                  key={preference}
                  type="button"
                  className={
                    formData.preferences.includes(preference)
                      ? "signup-preference selected"
                      : "signup-preference"
                  }
                  onClick={() => togglePreference(preference)}
                  aria-pressed={formData.preferences.includes(preference)}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" className="login-button">
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

      </section>
    </main>
  );
}

export default Signup;

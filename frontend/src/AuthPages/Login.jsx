
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Login submitted");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">

        <h1 className="brand-title">
          Welcome to <span>GroupGo</span>
        </h1>

        <p className="auth-subtitle">
          Bring your group together. Plan your next adventure.
        </p>

        <h2>Log In</h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

      </section>
    </main>
  );
}

export default Login;

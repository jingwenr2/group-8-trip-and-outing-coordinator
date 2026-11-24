import { Link, NavLink } from "react-router-dom";
import "./NavigationTab.css";

export default function NavigationBar() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/events" className="site-nav__brand">
        GroupGo
      </Link>
      <div className="site-nav__links">
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink");

export default function TopNav() {
  return (
    <header className="topBar">
      <div className="topBarInner">
        <div className="logoBox" aria-label="App logo">
          ✿
        </div>

        <nav className="navPills">
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/materials" className={linkClass}>Materials</NavLink>
          <NavLink to="/reports" className={linkClass}>Reports</NavLink>
        </nav>
      </div>
    </header>
  );
}

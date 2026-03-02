import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { logout } from "../services/authService.js";

const linkClass = ({ isActive }) =>
  isActive ? "navLink navLinkActive" : "navLink";

export default function TopNav() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="topBar">
      <div className="topBarInner">
        <div className="logoBox" aria-label="App logo" onClick={() => navigate("/home")}>
          ✿
        </div>

        {user && (
          <nav className="navPills">
            <NavLink to="/home" className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/materials" className={linkClass}>Materials</NavLink>
            <NavLink to="/profile" className={linkClass}>Profile</NavLink>
          </nav>
        )}

        <div>
          {user ? (
            <button className="btn btnGhost" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <NavLink to="/login" className="btn btnPrimary">
              Log in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

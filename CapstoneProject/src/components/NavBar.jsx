import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const linkClass = ({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink");

export default function NavBar() {
  const { user, logoutDemo } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topBar">
        <div className="topBarInner">
             <div className="brand" onClick={() => navigate("/dashboard")} role="button" tabIndex={0}>
                 <div className="brandMark" aria-hidden="true">✿</div>
                 <div>
                    <div className="brandName">CraftLedger</div>
                     <div className="brandTag">maker inventory + pricing</div>
                 </div>
             </div>
        </div>

      <nav className="nav">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/materials" className={linkClass}>Materials</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
        <NavLink to="/reports" className={linkClass}>Reports</NavLink>
        <NavLink to="/settings" className={linkClass}>Settings</NavLink>
      </nav>

      <div className="topBarRight">
        {!user ? (
          <button className="btn btnPrimary" onClick={() => navigate("/login")}>Log in</button>
        ) : (
          <button
            className="btn btnGhost"
            onClick={() => {
              logoutDemo();
              navigate("/login");
            }}
          >
            Log out
          </button>
        )}
      </div>
    </header>
  );
}

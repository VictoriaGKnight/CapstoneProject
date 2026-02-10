import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="card">
        <h1 className="h1">Page not found</h1>
        <p className="muted">Let’s get you back to something cute and useful.</p>
        <Link className="btn btnPrimary" to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
}

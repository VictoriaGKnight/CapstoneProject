import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <h1 className="pageTitle">Not Found</h1>
      <Link className="btn btnPrimary" to="/home">Go Home</Link>
    </div>
  );
}

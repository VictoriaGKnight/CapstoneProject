export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="card centerCard">
      <div className="spinner" aria-hidden="true" />
      <div className="muted" style={{ marginTop: "0.8rem" }}>{label}</div>
    </div>
  );
}

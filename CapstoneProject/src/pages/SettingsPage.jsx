export default function SettingsPage() {
  return (
    <div className="page">
      <h1 className="h1">Settings</h1>
      <p className="muted">Defaults and preferences (placeholder).</p>

      <div className="card formGrid">
        <label className="label">
          Shop name
          <input className="input" placeholder="e.g., Stitched by V.G." />
        </label>

        <label className="label">
          Default hourly rate
          <input className="input" placeholder="e.g., 15" />
        </label>

        <div className="rowEnd">
          <button className="btn btnPrimary">Save</button>
        </div>
      </div>
    </div>
  );
}

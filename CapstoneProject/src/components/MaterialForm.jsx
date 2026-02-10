export default function MaterialForm() {
  return (
    <form className="card formGrid" onSubmit={(e) => e.preventDefault()}>
      <h2 className="h2">Add Material (placeholder)</h2>

      <label className="label">
        Material name
        <input className="input" placeholder="e.g., Pink cotton fabric" />
      </label>

      <label className="label">
        Unit (yards / pieces / oz)
        <input className="input" placeholder="e.g., yards" />
      </label>

      <div className="twoCol">
        <label className="label">
          Unit cost
          <input className="input" placeholder="e.g., 6.50" />
        </label>

        <label className="label">
          Quantity
          <input className="input" placeholder="e.g., 12" />
        </label>
      </div>

      <label className="label">
        Reorder threshold
        <input className="input" placeholder="e.g., 3" />
      </label>

      <div className="rowEnd">
        <button className="btn btnSoft" type="button">Clear</button>
        <button className="btn btnPrimary" type="submit">Save</button>
      </div>
    </form>
  );
}

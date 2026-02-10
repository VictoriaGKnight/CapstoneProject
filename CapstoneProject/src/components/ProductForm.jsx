export default function ProductForm() {
  return (
    <form className="card formGrid" onSubmit={(e) => e.preventDefault()}>
      <h2 className="h2">Add Product (placeholder)</h2>

      <label className="label">
        Product name
        <input className="input" placeholder='e.g., "Zipper Pouch"' />
      </label>

      <div className="twoCol">
        <label className="label">
          Labor minutes
          <input className="input" placeholder="e.g., 25" />
        </label>

        <label className="label">
          Hourly rate
          <input className="input" placeholder="e.g., 15" />
        </label>
      </div>

      <div className="twoCol">
        <label className="label">
          Overhead ($)
          <input className="input" placeholder="e.g., 1.25" />
        </label>

        <label className="label">
          Margin (%)
          <input className="input" placeholder="e.g., 50" />
        </label>
      </div>

      <label className="label">
        Starting stock
        <input className="input" placeholder="e.g., 0" />
      </label>

      <div className="rowEnd">
        <button className="btn btnSoft" type="button">Clear</button>
        <button className="btn btnPrimary" type="submit">Save</button>
      </div>
    </form>
  );
}

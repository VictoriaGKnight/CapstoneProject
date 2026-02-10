export default function BOMEditor() {
  return (
    <div className="card">
      <h2 className="h2">Bill of Materials (placeholder)</h2>
      <p className="muted">Add materials and quantities used per product.</p>

      <div className="twoCol">
        <label className="label">
          Material
          <select className="input">
            <option>Choose a material...</option>
            <option>Pink cotton fabric</option>
            <option>Zippers (7")</option>
          </select>
        </label>

        <label className="label">
          Quantity used
          <input className="input" placeholder="e.g., 0.5" />
        </label>
      </div>

      <div className="rowEnd">
        <button className="btn btnPrimary" type="button">Add to BOM</button>
      </div>

      <div className="table" style={{ marginTop: "1rem" }}>
        <div className="tableRow tableHeader">
          <div>Material</div><div>Qty Used</div><div>Unit</div><div>Actions</div>
        </div>

        <div className="tableRow" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
          <div>Pink cotton fabric</div><div>0.5</div><div>yards</div>
          <div><button className="btn btnGhost">Remove</button></div>
        </div>
      </div>
    </div>
  );
}

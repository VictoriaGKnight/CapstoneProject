import MaterialForm from "../components/MaterialForm.jsx";

export default function MaterialsPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Materials</h1>
          <p className="muted">Track fabric, zippers, thread, packaging, and more.</p>
        </div>
        <button className="btn btnPrimary">+ Add Material</button>
      </div>

      <MaterialForm />

      <div className="card">
        <h2 className="h2">Materials List (placeholder)</h2>

        <div className="table">
          <div className="tableRow tableHeader">
            <div>Name</div><div>Unit</div><div>Cost</div><div>Qty</div><div>Status</div>
          </div>

          <div className="tableRow">
            <div>Pink cotton fabric</div><div>yards</div><div>$6.50</div><div>2</div>
            <div><span className="pill pillWarn">Low</span></div>
          </div>

          <div className="tableRow">
            <div>Zippers (7")</div><div>pieces</div><div>$0.85</div><div>18</div>
            <div><span className="pill pillOk">OK</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import BOMEditor from "../components/BOMEditor.jsx";

export default function ProductDetailPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Product Details</h1>
          <p className="muted">View BOM, calculate costs, and manage stock.</p>
        </div>
        <div className="row">
          <button className="btn btnSoft">Make Batch</button>
          <button className="btn btnPrimary">Record Sale</button>
        </div>
      </div>

      <div className="split">
        <div className="card">
          <h2 className="h2">Pricing (placeholder)</h2>
          <div className="results">
            <div className="resultRow"><span>Materials cost</span><strong>$4.10</strong></div>
            <div className="resultRow"><span>Labor cost</span><strong>$6.25</strong></div>
            <div className="resultRow"><span>Overhead</span><strong>$1.25</strong></div>
            <div className="resultRow"><span>Total cost</span><strong>$11.60</strong></div>
            <hr className="divider" />
            <div className="resultRow big"><span>Suggested price</span><strong>$23.20</strong></div>
          </div>
        </div>

        <div className="card">
          <h2 className="h2">Stock</h2>
          <p className="muted">Current stock: <strong>6</strong></p>
          <div className="twoCol">
            <input className="input" placeholder="Adjust stock (e.g., +5 or -2)" />
            <button className="btn btnPrimary">Apply</button>
          </div>
        </div>
      </div>

      <BOMEditor />
    </div>
  );
}

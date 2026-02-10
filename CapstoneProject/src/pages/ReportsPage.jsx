export default function ReportsPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Reports</h1>
          <p className="muted">Low stock, profitability, and inventory value (placeholder).</p>
        </div>
        <button className="btn btnPrimary">Export CSV</button>
      </div>

      <div className="grid3">
        <div className="card">
          <h2 className="h2">Low Stock</h2>
          <p className="muted">3 materials need restocking</p>
          <button className="btn btnSoft">View List</button>
        </div>

        <div className="card">
          <h2 className="h2">Profitability</h2>
          <p className="muted">Top products by profit/unit</p>
          <button className="btn btnSoft">Open Report</button>
        </div>

        <div className="card">
          <h2 className="h2">Inventory Value</h2>
          <p className="muted">Estimated total value</p>
          <button className="btn btnSoft">Calculate</button>
        </div>
      </div>
    </div>
  );
}

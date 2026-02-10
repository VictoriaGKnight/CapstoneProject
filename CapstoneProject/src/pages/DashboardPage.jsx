

export default function DashboardPage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="heroLeft">
          <h1 className="h1">Dashboard ✿</h1>
          <p className="muted">Your maker workspace — quick actions, low stock, and notes.</p>

          <div className="heroActions">
            <button className="btn btnPrimary" type="button">Add Product</button>
            <button className="btn btnSoft" type="button">Add Material</button>
          </div>

          <div className="searchRow">
            <input className="input" placeholder="Search products or materials..." />
            <button className="btn btnGhost" type="button">Search</button>
          </div>

          <div className="stats">
            <div className="statCard">
              <div className="statTitle">Low Stock</div>
              <div className="statValue">3</div>
              <div className="statSub">materials below threshold</div>
            </div>
            <div className="statCard">
              <div className="statTitle">Products</div>
              <div className="statValue">12</div>
              <div className="statSub">active listings</div>
            </div>
            <div className="statCard">
              <div className="statTitle">Top Profit / Unit</div>
              <div className="statValue">$8.50</div>
              <div className="statSub">estimate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="card">
          <h2 className="h2">Quick Actions</h2>
          <div className="stack">
            <button className="btn btnSoft" type="button">Make Batch</button>
            <button className="btn btnSoft" type="button">Record Sale</button>
            <button className="btn btnSoft" type="button">Export CSV</button>
          </div>
        </div>

        <div className="card">
          <h2 className="h2">Notes</h2>
          <textarea className="textarea" rows={6} placeholder="Restock ideas, craft fair checklist, etc..." />
          <div className="rowEnd">
            <button className="btn btnPrimary" type="button">Save Note</button>
          </div>
        </div>
      </section>
    </div>
  );
}

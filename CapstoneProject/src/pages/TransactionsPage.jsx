export default function TransactionsPage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Transactions</h1>
          <p className="muted">Restocks, batch builds, sales, and adjustments (placeholder).</p>
        </div>
        <button className="btn btnSoft">Export</button>
      </div>

      <div className="card">
        <div className="table">
          <div className="tableRow tableHeader" style={{ gridTemplateColumns: "1fr 1fr 2fr 1fr" }}>
            <div>Date</div><div>Type</div><div>Item</div><div>Change</div>
          </div>

          <div className="tableRow" style={{ gridTemplateColumns: "1fr 1fr 2fr 1fr" }}>
            <div>Today</div><div>RESTOCK</div><div>Zippers (7")</div><div>+20</div>
          </div>

          <div className="tableRow" style={{ gridTemplateColumns: "1fr 1fr 2fr 1fr" }}>
            <div>Today</div><div>SALE</div><div>Zipper Pouch</div><div>-1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

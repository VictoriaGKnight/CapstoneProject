export default function ReportsPage() {
  return (
    <div className="page">
      <h1 className="pageTitle">Reports Dashboard</h1>

      <section className="reportsGrid">
        <div className="card">
          <h2 className="sectionTitle">Profit</h2>
          <div className="chartPlaceholder">
            <div className="bar b1" />
            <div className="bar b2" />
            <div className="bar b3" />
            <div className="bar b4" />
            <div className="bar b5" />
            <div className="bar b6" />
          </div>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Top Sellers</h2>
          <ol className="list">
            <li>Name</li>
            <li>Name</li>
            <li>Name</li>
          </ol>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Low Stock Products</h2>
          <div className="twoColList">
            <div className="listCol">
              <div>- Name</div>
              <div>- Name</div>
              <div>- Name</div>
            </div>
            <div className="listCol rightCol">
              <div>Quantity</div>
              <div>Quantity</div>
              <div>Quantity</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Low Stock Materials</h2>
          <div className="twoColList">
            <div className="listCol">
              <div>- Name</div>
              <div>- Name</div>
              <div>- Name</div>
            </div>
            <div className="listCol rightCol">
              <div>Quantity</div>
              <div>Quantity</div>
              <div>Quantity</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MaterialsPage() {
  return (
    <div className="page">
      <h1 className="pageTitle">Materials Page</h1>

      <section className="twoColWide">
        
        <div className="card">
          <h2 className="sectionTitle">Add Material</h2>

          <div className="formGrid">
            <label className="labelRow">
              <span>Material Name:</span>
              <input className="input"/>
            </label>

            <label className="labelRow">
              <span>Unit of Measure:</span>
              <input className="input"/>
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input className="input"/>
            </label>

            <label className="labelRow">
              <span>Cost Per Unit:</span>
              <input className="input"/>
            </label>

            <button className="btn btnPrimary materialAddBtn" type="button">
              Add
            </button>
          </div>
        </div>

        
        <div className="card">
          <h2 className="sectionTitle">Current Materials</h2>

          <div className="simpleTable">
            <div className="tableHeaderRow">
              <div>Name</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>

            <div className="tableRow">
              <div>Name</div><div>Quantity</div><div>Price</div>
            </div>
            <div className="tableRow">
              <div>Name</div><div>Quantity</div><div>Price</div>
            </div>
            <div className="tableRow">
              <div>Name</div><div>Quantity</div><div>Price</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

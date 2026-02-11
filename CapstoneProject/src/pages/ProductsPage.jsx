import placeholder from "../assets/Placeholder.png";

export default function ProductsPage() {
  return (
    <div className="page">
      <h1 className="pageTitle">Product Page</h1>

      <section className="twoColWide">
        
        <div className="card">
          <div className="bigImgWrap">
            <img className="bigImg" src={placeholder} alt="Product" />
          </div>

          <div className="priceRow">
            <div className="priceField">
              <span className="mutedLabel">Suggested Price:</span>
              <input className="input" placeholder="$" />
            </div>
            <div className="priceField">
              <span className="mutedLabel">Price:</span>
              <input className="input" placeholder="$" />
            </div>
          </div>
        </div>

        
        <div className="card">
          <div className="formHeader">
            <h2 className="sectionTitle">Details</h2>
            <button className="btn btnPrimary productAddNewBtn">Add</button>
          </div>

          <div className="formGrid">
            <label className="labelRow">
              <span>Product Name:</span>
              <input className="input"/>
            </label>

            <label className="labelRow">
              <span>Hours Worked:</span>
              <input className="input"/>
            </label>

            <label className="labelRow">
              <span>Hourly Wage:</span>
              <input className="input" placeholder/>
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input className="input"/>
            </label>

            <div className="materialsBlock">
              <div className="materialsTitle">Materials:</div>

              <div className="materialsList">
                <div className="materialsItem">
                  <span>1) Zipper</span>
                  <span className="mutedLabel">Quantity:</span>
                  <input className="input smallInput"/>
                </div>

                <div className="materialsItem">
                  <span>2) Fabric</span>
                  <span className="mutedLabel">Quantity:</span>
                  <input className="input smallInput"/>
                </div>
              </div>

              <div className="dropdownBox">
                <select className="input">
                  <option>Select a material</option>
                  <option>Zipper</option>
                  <option>Pink fabric</option>
                  <option>Thread</option>
                </select>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

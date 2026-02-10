import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Products</h1>
          <p className="muted">Manage finished goods + connect materials (BOM).</p>
        </div>
        <button className="btn btnPrimary">+ Add Product</button>
      </div>

      <ProductForm />

      <div className="card">
        <div className="searchRow">
          <input className="input" placeholder="Search products..." />
          <button className="btn btnGhost" type="button">Filter</button>
        </div>

        <div className="grid2" style={{ marginTop: "1rem" }}>
          <div className="card softCard">
            <h3 className="h3">Zipper Pouch</h3>
            <p className="muted">Stock: 6 • Suggested price: $14.00</p>
            <div className="row">
              <button className="btn btnSoft" onClick={() => navigate("/products/demo-1")}>View</button>
              <button className="btn btnGhost" type="button">Edit</button>
            </div>
          </div>

          <div className="card softCard">
            <h3 className="h3">Scrunchie</h3>
            <p className="muted">Stock: 24 • Suggested price: $6.00</p>
            <div className="row">
              <button className="btn btnSoft" onClick={() => navigate("/products/demo-2")}>View</button>
              <button className="btn btnGhost" type="button">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

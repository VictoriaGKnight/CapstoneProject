import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { addMaterial, deleteMaterial } from "../services/materialsService.js";

export default function MaterialsPage() {
  const { user } = useAuth();
  const { materials } = useData();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  async function handleAddMaterial() {
    if (!user) return;
    if (!name.trim()) {
      alert("Please enter a material name.");
      return;
    }

    await addMaterial(user.uid, {
      name: name.trim(),
      description: description.trim(),
      unit: unit.trim(),
      quantity: Number(quantity || 0),
      price: Number(price || 0),
    });

    setName("");
    setDescription("");
    setUnit("");
    setQuantity("");
    setPrice("");
  }

  async function handleDeleteMaterial(id) {
    if (!user) return;
    const ok = window.confirm("Delete this material?");
    if (!ok) return;
    await deleteMaterial(user.uid, id);
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Materials Page</h1>

      <section className="twoColWide">
        <div className="card">
          <h2 className="sectionTitle">Add Material</h2>

          <div className="formGrid">
            <label className="labelRow">
              <span>Material Name:</span>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Description:</span>
              <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Unit of Measure:</span>
              <input className="input" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input className="input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Cost Per Unit:</span>
              <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>

            <button className="btn btnPrimary materialAddBtn" type="button" onClick={handleAddMaterial}>
              Add
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Current Materials</h2>

          <div className="simpleTable">
            <div className="tableHeaderRow materialsTable">
              <div>Name</div>
              <div>Description</div>
              <div>Unit</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Remove</div>
            </div>

            {materials.map((m) => (
              <div key={m.id} className="tableRow materialsTable">
                <div>{m.name}</div>
                <div>{m.description || "-"}</div>
                <div>{m.unit || "-"}</div>
                <div>{m.quantity ?? 0}</div>
                <div>${Number(m.price || 0).toFixed(2)}</div>
                <div>
                  <button className="btn btnDanger" onClick={() => handleDeleteMaterial(m.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
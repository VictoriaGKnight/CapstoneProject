import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../services/materialsService.js";

const emptyForm = {
  name: "",
  description: "",
  unit: "",
  quantity: "",
  price: "",
};

export default function MaterialsPage() {
  const { user } = useAuth();
  const { materials } = useData();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const sortedMaterials = useMemo(() => {
    return [...materials].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }, [materials]);

  const leftColumn = sortedMaterials.filter((_, i) => i % 2 === 0);
  const rightColumn = sortedMaterials.filter((_, i) => i % 2 === 1);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!user) return;

    if (!form.name.trim()) {
      alert("Please enter a material name.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      unit: form.unit.trim(),
      quantity: Number(form.quantity || 0),
      price: Number(form.price || 0),
    };

    try {
      if (editingId) {
        await updateMaterial(user.uid, editingId, payload);
        alert("Material updated.");
      } else {
        await addMaterial(user.uid, payload);
        alert("Material added.");
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Error saving material: " + e.message);
    }
  }

  function startEdit(material) {
    setEditingId(material.id);
    setForm({
      name: material.name || "",
      description: material.description || "",
      unit: material.unit || "",
      quantity: String(material.quantity ?? ""),
      price: String(material.price ?? ""),
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleRemove(id) {
    if (!user) return;
    const ok = window.confirm("Delete this material?");
    if (!ok) return;

    try {
      await deleteMaterial(user.uid, id);
    } catch (e) {
      console.error(e);
      alert("Error deleting material: " + e.message);
    }
  }

  function MaterialCard({ material }) {
    return (
      <div className="materialCard">
        <div className="materialCardHeader">
          <div className="materialName">{material.name}</div>
          <div className="materialActions">
            <button className="btn btnGhost" onClick={() => startEdit(material)}>
              Edit
            </button>
            <button className="btn btnDanger" onClick={() => handleRemove(material.id)}>
              Remove
            </button>
          </div>
        </div>

        <div className="materialMetaGrid">
          <div>
            <span className="mutedLabel">Description:</span>
            <div>{material.description || "-"}</div>
          </div>
          <div>
            <span className="mutedLabel">Unit:</span>
            <div>{material.unit || "-"}</div>
          </div>
          <div>
            <span className="mutedLabel">Quantity:</span>
            <div>{material.quantity ?? 0}</div>
          </div>
          <div>
            <span className="mutedLabel">Price:</span>
            <div>${Number(material.price || 0).toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Materials Page</h1>

      <section className="card addMaterialTopCard">
        <h2 className="sectionTitle">
          {editingId ? "Edit Material" : "Add Material"}
        </h2>

        <div className="addMaterialTopGrid">
          <label className="stackLabel">
            <span>Material Name:</span>
            <input
              className="input"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </label>

          <label className="stackLabel">
            <span>Unit of Measure:</span>
            <input
              className="input"
              value={form.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            />
          </label>

          <label className="stackLabel addMaterialDescription">
            <span>Description:</span>
            <input
              className="input"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </label>

          <label className="stackLabel">
            <span>Quantity:</span>
            <input
              className="input"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
          </label>

          <label className="stackLabel">
            <span>Cost Per Unit:</span>
            <input
              className="input"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </label>

          <div className="addMaterialButtons">
            <button className="btn btnPrimary" type="button" onClick={handleSubmit}>
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button className="btn btnGhost" type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="materialsSavedSection">
        <h2 className="sectionTitle">Current Materials</h2>

        <div className="materialsTwoColumns">
          <div className="materialsColumn">
            {leftColumn.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>

          <div className="materialsColumn">
            {rightColumn.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
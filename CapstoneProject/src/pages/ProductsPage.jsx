import { useEffect, useMemo, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../assets/Placeholder.png";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { addProduct, updateProduct } from "../services/productsService.js";

export default function ProductsPage() {
  const { user } = useAuth();
  const { materials, profileSettings } = useData();
  const { productId } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [productMaterials, setProductMaterials] = useState([]);

  useEffect(() => {
    setHourlyWage(String(profileSettings.hourlyRate || 0));
  }, [profileSettings]);

  useEffect(() => {
    async function loadProduct() {
      if (!user || !productId) return;
      const ref = doc(db, "users", user.uid, "products", productId);
      const snap = await getDoc(ref);
      if (!snap.exists()) return;

      const p = snap.data();
      setProductName(p.name || "");
      setProductDescription(p.description || "");
      setHoursWorked(String(p.hoursWorked || ""));
      setHourlyWage(String(p.hourlyWage || profileSettings.hourlyRate || ""));
      setQuantity(String(p.quantity || ""));
      setPrice(String(p.price || ""));
      setImageDataUrl(p.image || "");
      setImagePreviewUrl(p.image || null);
      setProductMaterials(p.productMaterials || []);
    }

    loadProduct();
  }, [user, productId, profileSettings.hourlyRate]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);

    const dataUrl = await readFileAsDataURL(file);
    setImageDataUrl(dataUrl);
  }

  function clearImage() {
    setImagePreviewUrl(null);
    setImageDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const materialsCost = useMemo(() => {
    return productMaterials.reduce((sum, item) => {
      const qty = Number(item.usedQty || 0);
      const price = Number(item.price || 0);
      return sum + qty * price;
    }, 0);
  }, [productMaterials]);

  const suggestedPrice = useMemo(() => {
    const labor = Number(hoursWorked || 0) * Number(hourlyWage || 0);
    return (labor + materialsCost).toFixed(2);
  }, [hoursWorked, hourlyWage, materialsCost]);

  function handleSelectMaterial(materialId) {
    setSelectedMaterialId(materialId);
    const selected = materials.find((m) => m.id === materialId);
    if (!selected) return;

    const exists = productMaterials.some((m) => m.id === selected.id);
    if (exists) return;

    setProductMaterials((prev) => [
      ...prev,
      {
        id: selected.id,
        name: selected.name,
        description: selected.description || "",
        quantity: selected.quantity || 0,
        price: selected.price || 0,
        unit: selected.unit || "",
        usedQty: "",
      },
    ]);
  }

  function handleUsedQtyChange(id, value) {
    setProductMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, usedQty: value } : m))
    );
  }

  function removeProductMaterial(id) {
    setProductMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleSaveProduct() {
    if (!user) return;
    if (!productName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    const payload = {
      name: productName.trim(),
      description: productDescription.trim(),
      hoursWorked: Number(hoursWorked || 0),
      hourlyWage: Number(hourlyWage || 0),
      quantity: Number(quantity || 0),
      price: Number(price || 0),
      suggestedPrice: Number(suggestedPrice || 0),
      image: imageDataUrl || "",
      productMaterials,
    };

    if (productId) {
      await updateProduct(user.uid, productId, payload);
      alert("Product updated.");
    } else {
      await addProduct(user.uid, payload);
      alert("Product added.");
    }

    navigate("/home");
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Product Page</h1>

      <section className="twoColWide">
        <div className="card">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button type="button" className="imagePicker" onClick={openFilePicker}>
            <img className="bigImg" src={imagePreviewUrl || placeholder} alt="Product" />
            {!imagePreviewUrl && <div className="imagePickerOverlay">Click to upload</div>}
          </button>

          <div className="imagePickerBtns">
            <button type="button" className="btn btnPrimary" onClick={openFilePicker}>
              Upload Image
            </button>
            <button type="button" className="btn btnGhost" onClick={clearImage}>
              Remove
            </button>
          </div>

          <div className="priceRow">
            <div className="priceField">
              <span className="mutedLabel">Suggested Price:</span>
              <input className="input" value={`$${suggestedPrice}`} readOnly />
            </div>
            <div className="priceField">
              <span className="mutedLabel">Price:</span>
              <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="formHeader">
            <h2 className="sectionTitle">Details</h2>
            <button className="btn btnPrimary" type="button" onClick={handleSaveProduct}>
              {productId ? "Update" : "Add"}
            </button>
          </div>

          <div className="formGrid">
            <label className="labelRow">
              <span>Product Name:</span>
              <input className="input" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Product Description:</span>
              <input className="input" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Hours Worked:</span>
              <input className="input" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} />
            </label>

            <label className="labelRow">
              <span>Hourly Wage:</span>
              <input className="input" value={hourlyWage} readOnly />
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input className="input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>

            <div className="materialsBlock">
              <div className="materialsTitle">Materials:</div>

              <div className="dropdownBox">
                <select
                  className="input"
                  value={selectedMaterialId}
                  onChange={(e) => handleSelectMaterial(e.target.value)}
                >
                  <option value="">Select a material</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} | {m.description || "No description"} | Qty: {m.quantity ?? 0} | ${Number(m.price || 0).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="materialsList">
                {productMaterials.map((m, index) => (
                  <div key={m.id} className="productMaterialCard">
                    <div><strong>{index + 1}) {m.name}</strong></div>
                    <div>{m.description || "-"}</div>
                    <div>Available: {m.quantity ?? 0}</div>
                    <div>Cost per unit: ${Number(m.price || 0).toFixed(2)}</div>
                    <div>Unit: {m.unit || "-"}</div>

                    <div className="productMaterialRow">
                      <span className="mutedLabel">Used:</span>
                      <input
                        className="input smallInput"
                        value={m.usedQty}
                        onChange={(e) => handleUsedQtyChange(m.id, e.target.value)}
                      />
                    </div>

                    <button className="btn btnDanger" onClick={() => removeProductMaterial(m.id)}>
                      Remove Material
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/*
import { useEffect, useMemo, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../assets/Placeholder.png";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { addProduct, updateProduct } from "../services/productsService.js";
import { updateMaterial } from "../services/materialsService.js";

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
  const [selectedMaterialQty, setSelectedMaterialQty] = useState("");
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

  useEffect(() => {
    return () => {
      if (imagePreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  function clearImage() {
    setImagePreviewUrl(null);
    setImageDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const materialsCost = useMemo(() => {
    return productMaterials.reduce((sum, item) => {
      const used = Number(item.usedQty || 0);
      const cost = Number(item.price || 0);
      return sum + used * cost;
    }, 0);
  }, [productMaterials]);

  const suggestedPrice = useMemo(() => {
    const labor = Number(hoursWorked || 0) * Number(hourlyWage || 0);
    return (labor + materialsCost).toFixed(2);
  }, [hoursWorked, hourlyWage, materialsCost]);

  function handleAddSelectedMaterial() {
    if (!selectedMaterialId) {
      alert("Please choose a material.");
      return;
    }

    if (!selectedMaterialQty) {
      alert("Please enter how much of that material is used.");
      return;
    }

    const selected = materials.find((m) => m.id === selectedMaterialId);
    if (!selected) return;

    const alreadyAdded = productMaterials.some((m) => m.id === selected.id);
    if (alreadyAdded) {
      alert("That material is already on this product.");
      return;
    }

    setProductMaterials((prev) => [
      ...prev,
      {
        id: selected.id,
        name: selected.name,
        description: selected.description || "",
        unit: selected.unit || "",
        quantity: Number(selected.quantity || 0),
        price: Number(selected.price || 0),
        usedQty: selectedMaterialQty,
      },
    ]);

    // reset dropdown + quantity field after clicking Add Material
    setSelectedMaterialId("");
    setSelectedMaterialQty("");
  }

  function handleUsedQtyChange(id, value) {
    setProductMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, usedQty: value } : m))
    );
  }

  function handleRemoveProductMaterial(id) {
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

    try {
      if (productId) {
        await updateProduct(user.uid, productId, payload);
        alert("Product updated.");
      } else {
        await addProduct(user.uid, payload);

        // subtract used material amounts only when creating a new product
        for (const item of productMaterials) {
          const currentQty = Number(item.quantity || 0);
          const usedQty = Number(item.usedQty || 0);
          const nextQty = Math.max(0, currentQty - usedQty);

          await updateMaterial(user.uid, item.id, {
            quantity: nextQty,
          });
        }

        alert("Product added.");
      }

      navigate("/home");
    } catch (e) {
      console.error(e);
      alert("Error saving product: " + e.message);
    }
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
            {!imagePreviewUrl && (
              <div className="imagePickerOverlay">Click to upload</div>
            )}
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
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
              <input
                className="input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Product Description:</span>
              <input
                className="input"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Hours Worked:</span>
              <input
                className="input"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Hourly Wage:</span>
              <input className="input" value={hourlyWage} readOnly />
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            <div className="materialsBlock">
              <div className="materialsTitle">Materials:</div>

              <div className="addMaterialRow">
                <select
                  className="input"
                  value={selectedMaterialId}
                  onChange={(e) => setSelectedMaterialId(e.target.value)}
                >
                  <option value="">Choose a material</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} | {m.description || "No description"} | {m.unit || "-"} | Qty:{" "}
                      {m.quantity ?? 0} | ${Number(m.price || 0).toFixed(2)}
                    </option>
                  ))}
                </select>

                <input
                  className="input smallInput"
                  placeholder="Used"
                  value={selectedMaterialQty}
                  onChange={(e) => setSelectedMaterialQty(e.target.value)}
                />

                <button
                  className="btn btnPrimary"
                  type="button"
                  onClick={handleAddSelectedMaterial}
                >
                  Add Material
                </button>
              </div>

              <div className="materialsList">
                {productMaterials.map((m, index) => (
                  <div key={m.id} className="productMaterialCard">
                    <div>
                      <strong>
                        {index + 1}) {m.name}
                      </strong>
                    </div>
                    <div>{m.description || "-"}</div>
                    <div>Unit: {m.unit || "-"}</div>
                    <div>Available: {m.quantity ?? 0}</div>
                    <div>Cost per unit: ${Number(m.price || 0).toFixed(2)}</div>

                    <div className="productMaterialRow">
                      <span className="mutedLabel">Used:</span>
                      <input
                        className="input smallInput"
                        value={m.usedQty}
                        onChange={(e) => handleUsedQtyChange(m.id, e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btnDanger"
                      type="button"
                      onClick={() => handleRemoveProductMaterial(m.id)}
                    >
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
*/

import { useEffect, useMemo, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../assets/Placeholder.png";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { addProduct, updateProduct } from "../services/productsService.js";
import { updateMaterial } from "../services/materialsService.js";

export default function ProductsPage() {
  const { user } = useAuth();
  const { materials, profileSettings } = useData();
  const { productId } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [productImages, setProductImages] = useState([]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourlyWage, setHourlyWage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [selectedMaterialQty, setSelectedMaterialQty] = useState("");
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
      setProductMaterials(p.productMaterials || []);

      const images = Array.isArray(p.images) ? p.images : p.image ? [p.image] : [];      setProductImages(images);
      setImagePreviewUrl(images[0] || null);
    }

    loadProduct();
  }, [user, productId, profileSettings.hourlyRate]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!validFiles.length) {
      alert("Please choose image files only.");
      e.target.value = "";
      return;
    }

    try {
      const dataUrls = await Promise.all(validFiles.map(readFileAsDataURL));

      setProductImages((prev) => {
        const updated = [...prev, ...dataUrls];
        if (!imagePreviewUrl && updated.length > 0) {
          setImagePreviewUrl(updated[0]);
        }
        return updated;
      });

      e.target.value = "";
    } catch (error) {
      console.error(error);
      alert("Error reading image files.");
    }
  }

  function clearAllImages() {
    setProductImages([]);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImageAtIndex(indexToRemove) {
    setProductImages((prev) => {
      const updated = prev.filter((_, index) => index !== indexToRemove);

      if (updated.length === 0) {
        setImagePreviewUrl(null);
      } else if (prev[indexToRemove] === imagePreviewUrl) {
        setImagePreviewUrl(updated[0]);
      }

      return updated;
    });
  }

  function makePrimaryImage(imageUrl) {
    setImagePreviewUrl(imageUrl);
  }

  const materialsCost = useMemo(() => {
    return productMaterials.reduce((sum, item) => {
      const used = Number(item.usedQty || 0);
      const cost = Number(item.price || 0);
      return sum + used * cost;
    }, 0);
  }, [productMaterials]);

  const suggestedPrice = useMemo(() => {
    const labor = Number(hoursWorked || 0) * Number(hourlyWage || 0);
    return (labor + materialsCost).toFixed(2);
  }, [hoursWorked, hourlyWage, materialsCost]);

  function handleAddSelectedMaterial() {
    if (!selectedMaterialId) {
      alert("Please choose a material.");
      return;
    }

    if (!selectedMaterialQty) {
      alert("Please enter how much of that material is used.");
      return;
    }

    const selected = materials.find((m) => m.id === selectedMaterialId);
    if (!selected) return;

    const alreadyAdded = productMaterials.some((m) => m.id === selected.id);
    if (alreadyAdded) {
      alert("That material is already on this product.");
      return;
    }

    setProductMaterials((prev) => [
      ...prev,
      {
        id: selected.id,
        name: selected.name,
        description: selected.description || "",
        unit: selected.unit || "",
        quantity: Number(selected.quantity || 0),
        price: Number(selected.price || 0),
        usedQty: selectedMaterialQty,
      },
    ]);

    setSelectedMaterialId("");
    setSelectedMaterialQty("");
  }

  function handleUsedQtyChange(id, value) {
    setProductMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, usedQty: value } : m))
    );
  }

  function handleRemoveProductMaterial(id) {
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

      images: productImages,

      image: productImages[0] || "",

      productMaterials,
    };

    try {
      if (productId) {
        await updateProduct(user.uid, productId, payload);
        alert("Product updated.");
      } else {
        await addProduct(user.uid, payload);

        for (const item of productMaterials) {
          const currentQty = Number(item.quantity || 0);
          const usedQty = Number(item.usedQty || 0);
          const nextQty = Math.max(0, currentQty - usedQty);

          await updateMaterial(user.uid, item.id, {
            quantity: nextQty,
          });
        }

        alert("Product added.");
      }

      navigate("/home");
    } catch (e) {
      console.error(e);
      alert("Error saving product: " + e.message);
    }
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
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button type="button" className="imagePicker" onClick={openFilePicker}>
            <img className="bigImg" src={imagePreviewUrl || placeholder} alt="Product" />
            {!imagePreviewUrl && (
              <div className="imagePickerOverlay">Click to upload</div>
            )}
          </button>

          <div className="imagePickerBtns">
            <button type="button" className="btn btnPrimary" onClick={openFilePicker}>
              Upload Images
            </button>
            <button type="button" className="btn btnGhost" onClick={clearAllImages}>
              Remove All
            </button>
          </div>

          {productImages.length > 0 && (
            <div className="thumbnailGrid">
              {productImages.map((img, index) => (
                <div key={index} className="thumbnailCard">
                  <button
                    type="button"
                    className={`thumbnailButton ${img === imagePreviewUrl ? "thumbnailActive" : ""}`}
                    onClick={() => makePrimaryImage(img)}
                  >
                    <img src={img} alt={`Product thumbnail ${index + 1}`} className="thumbnailImg" />
                  </button>

                  <button
                    type="button"
                    className="thumbnailRemove"
                    onClick={() => removeImageAtIndex(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="priceRow">
            <div className="priceField">
              <span className="mutedLabel">Suggested Price:</span>
              <input className="input" value={`$${suggestedPrice}`} readOnly />
            </div>
            <div className="priceField">
              <span className="mutedLabel">Price:</span>
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
              <input
                className="input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Product Description:</span>
              <input
                className="input"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Hours Worked:</span>
              <input
                className="input"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
              />
            </label>

            <label className="labelRow">
              <span>Hourly Wage:</span>
              <input className="input" value={hourlyWage} readOnly />
            </label>

            <label className="labelRow">
              <span>Quantity:</span>
              <input
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            <div className="materialsBlock">
              <div className="materialsTitle">Materials:</div>

              <div className="addMaterialRow">
                <select
                  className="input"
                  value={selectedMaterialId}
                  onChange={(e) => setSelectedMaterialId(e.target.value)}
                >
                  <option value="">Choose a material</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} | {m.description || "No description"} | {m.unit || "-"} | Qty:{" "}
                      {m.quantity ?? 0} | ${Number(m.price || 0).toFixed(2)}
                    </option>
                  ))}
                </select>

                <input
                  className="input smallInput"
                  placeholder="Used"
                  value={selectedMaterialQty}
                  onChange={(e) => setSelectedMaterialQty(e.target.value)}
                />

                <button
                  className="btn btnPrimary"
                  type="button"
                  onClick={handleAddSelectedMaterial}
                >
                  Add Material
                </button>
              </div>

              <div className="materialsList">
                {productMaterials.map((m, index) => (
                  <div key={m.id} className="productMaterialCard">
                    <div>
                      <strong>
                        {index + 1}) {m.name}
                      </strong>
                    </div>
                    <div>{m.description || "-"}</div>
                    <div>Unit: {m.unit || "-"}</div>
                    <div>Available: {m.quantity ?? 0}</div>
                    <div>Cost per unit: ${Number(m.price || 0).toFixed(2)}</div>

                    <div className="productMaterialRow">
                      <span className="mutedLabel">Used:</span>
                      <input
                        className="input smallInput"
                        value={m.usedQty}
                        onChange={(e) => handleUsedQtyChange(m.id, e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btnDanger"
                      type="button"
                      onClick={() => handleRemoveProductMaterial(m.id)}
                    >
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



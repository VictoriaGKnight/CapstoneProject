import { useEffect, useRef, useState } from "react";
import placeholder from "../assets/Placeholder.png";

export default function ProductsPage() {
  const fileInputRef = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [imageDataUrl, setImageDataUrl] = useState("");

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (PNG, JPG, etc.)");
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
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  function clearImage() {
    setImagePreviewUrl(null);
    setImageDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleAddProduct() {
    const newProduct = {
      name: "Example",
      image: imageDataUrl, 
    };

    console.log("Add product:", newProduct);
    alert("Product added (demo). Check console.");

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

          <button
            type="button"
            className="imagePicker"
            onClick={openFilePicker}
            aria-label="Upload product image"
          >
            <img
              className="bigImg"
              src={imagePreviewUrl || placeholder}
              alt="Product"
            />
            {!imagePreviewUrl && (
              <div className="imagePickerOverlay">
                Click to upload
              </div>
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
            <button className="btn btnPrimary" type="button" onClick={handleAddProduct}>
              Add
            </button>
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
              <input className="input"/>
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

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  name,
  price,
  qty,
  imageSrc,
  onAdd,
  onSold,
  onRemove,
}) {
  const navigate = useNavigate();

  return (
    <div className="card productCard">
      <button
        type="button"
        className="productCardClick"
        onClick={() => navigate(`/products/${id}`)}
      >
        <div className="productImgWrap">
          {imageSrc ? (
            <img className="productImg" src={imageSrc} alt={`${name} product`} />
          ) : (
            <div className="productImgPlaceholder">Product Image</div>
          )}
        </div>

        <div className="productMeta">
          <div className="productLine">
            <span className="mutedLabel">Price:</span>
            <strong>${Number(price || 0).toFixed(2)}</strong>
            <span className="productName">{name}</span>
          </div>
          <div className="productLine">
            <span className="mutedLabel">Quantity:</span>
            <strong>{qty}</strong>
          </div>
        </div>
      </button>

      <div className="productActions productActions3">
        <button className="btn btnPrimary" type="button" onClick={onAdd}>ADD</button>
        <button className="btn btnGhost" type="button" onClick={onSold}>SOLD</button>
        <button className="btn btnDanger" type="button" onClick={onRemove}>REMOVE</button>
      </div>
    </div>
  );
}

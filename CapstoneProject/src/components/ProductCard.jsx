export default function ProductCard({ name, price, qty, imageSrc }) {
  return (
    <div className="card productCard">
      <div className="productImgWrap">
        {imageSrc ? (
          <img className="productImg" src={imageSrc} alt={`${name} product`} />
        ) : (
          <div className="productImgPlaceholder">Product Image</div>
        )}
      </div>

      <div className="productMeta">
        <div className="productLine">
          <span className="mutedLabel">Price:</span> <strong>${price}</strong>
          <span className="productName">{name}</span>
        </div>
        <div className="productLine">
          <span className="mutedLabel">Quantity:</span> <strong>{qty}</strong>
        </div>
      </div>

      <div className="productActions">
        <button className="btn btnPrimary productAddBtn" type="button">ADD</button>
        <button className="btn btnGhost productSoldBtn" type="button">SOLD</button>
      </div>
    </div>
  );
}

import ProductCard from "../components/ProductCard.jsx";
import placeholder from "../assets/Placeholder.png";
import { useData } from "../context/DataContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteProduct, updateProduct } from "../services/productsService.js";

export default function HomePage() {
  const { products } = useData();
  const { user } = useAuth();

  async function handleAdjustQty(product, delta) {
    if (!user) return;
    const nextQty = Math.max(0, Number(product.quantity || 0) + delta);
    await updateProduct(user.uid, product.id, { quantity: nextQty });
  }

  async function handleRemove(productId) {
    if (!user) return;
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    await deleteProduct(user.uid, productId);
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Home Page</h1>

      {products.length === 0 ? (
        <div className="card">
          <p className="mutedLabel" style={{ margin: 0 }}>
            No products yet. Go to the Product page and add one ✿
          </p>
        </div>
      ) : (
        <section className="gridCards">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name || "Unnamed"}
              price={p.price ?? 0}
              qty={p.quantity ?? 0}
              imageSrc={p.image || placeholder}
              onAdd={() => handleAdjustQty(p, 1)}
              onSold={() => handleAdjustQty(p, -1)}
              onRemove={() => handleRemove(p.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
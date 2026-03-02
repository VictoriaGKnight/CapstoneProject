/*
import ProductCard from "../components/ProductCard.jsx";
import placeholder from "../assets/Placeholder.png";

import { useData } from "../context/DataContext.jsx";
const { products } = useData();

export default function HomePage() {
  
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "Name",
    price: "0.00",
    qty: 0,
    imageSrc: placeholder,
  }));

  return (
    <div className="page">
      <h1 className="pageTitle">Home Page</h1>

      <section className="gridCards">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            qty={p.qty}
            imageSrc={p.imageSrc}
          />
        ))}
      </section>
    </div>
  );
}
*/

import ProductCard from "../components/ProductCard.jsx";
import placeholder from "../assets/Placeholder.png";
import { useData } from "../context/DataContext.jsx";

export default function HomePage() {
  const { products } = useData();

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
              name={p.name || "Unnamed"}
              price={p.price ?? 0}
              qty={p.quantity ?? 0}
              imageSrc={p.image || placeholder}
            />
          ))}
        </section>
      )}
    </div>
  );
}
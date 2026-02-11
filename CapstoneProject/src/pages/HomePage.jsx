import ProductCard from "../components/ProductCard.jsx";
import placeholder from "../assets/Placeholder.png";

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

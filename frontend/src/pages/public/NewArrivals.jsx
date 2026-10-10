import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";
import ProductCard from "../../components/ProductCard";

export default function NewArrivals() {
  const { sellerProducts = [] } = useSeller();

  const newProducts = [...sellerProducts]
    .reverse()
    .slice(0, 8);

  return (
    <main className="catalog-page">
      <div className="catalog-heading">
        <p className="admin-eyebrow">JUST LANDED</p>
        <h1>New Arrivals</h1>
        <p>Explore the latest additions to our product catalog.</p>
      </div>

      {newProducts.length === 0 ? (
        <div className="admin-empty">
          <h3>No products available</h3>
          <p>Products will appear here when they are added to the catalog.</p>
          <Link to="/shop">Browse the shop</Link>
        </div>
      ) : (
        <div className="catalog-product-grid">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="catalog-back-link">
        <Link to="/shop">Explore all products →</Link>
      </p>
    </main>
  );
}

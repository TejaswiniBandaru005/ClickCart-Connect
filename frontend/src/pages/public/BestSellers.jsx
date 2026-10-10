import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";
import ProductCard from "../../components/ProductCard";

export default function BestSellers() {
  const { sellerProducts = [] } = useSeller();

  const popularProducts = [...sellerProducts]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 8);

  return (
    <main className="catalog-page">
      <div className="catalog-heading">
        <p className="admin-eyebrow">CUSTOMER FAVORITES</p>
        <h1>Best Sellers</h1>
        <p>Explore highly rated products in our current catalog.</p>
      </div>

      {popularProducts.length === 0 ? (
        <div className="admin-empty">
          <h3>No products available</h3>
          <p>Products will appear here when they are added to the catalog.</p>
          <Link to="/shop">Browse the shop</Link>
        </div>
      ) : (
        <div className="catalog-product-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="catalog-back-link">
        <Link to="/shop">Browse all products →</Link>
      </p>
    </main>
  );
}

import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";
import ProductCard from "../../components/ProductCard";

function Deals() {
  const { sellerProducts = [] } = useSeller();

  const deals = sellerProducts.filter((product) => {
    const original = Number(product.originalPrice);
    const price = Number(product.price);
    return original > price;
  });

  return (
    <div className="catalog-page">
      <div className="catalog-heading">
        <p className="admin-eyebrow">LIMITED TIME</p>
        <h1>Deals</h1>
        <p>Products currently listed below their original price.</p>
      </div>

      {deals.length === 0 ? (
        <div className="empty-products">
          <h2>No deals right now</h2>
          <p>Check back later or browse the full shop.</p>
          <Link to="/shop">Browse Shop</Link>
        </div>
      ) : (
        <div className="product-grid">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Deals;

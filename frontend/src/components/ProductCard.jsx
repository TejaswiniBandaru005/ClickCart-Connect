
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const isSaved = wishlist.some(
    (item) => String(item.id) === String(product.id)
  );

  const originalPrice = Number(product.originalPrice) || 0;
  const price = Number(product.price) || 0;
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}

        <button
          className="product-wishlist-button"
          aria-label={
            isSaved ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={() => toggleWishlist(product)}
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="product-rating">⭐ {product.rating}</div>

        <div className="product-price">
          <strong>
            ₹{price.toLocaleString("en-IN")}
          </strong>
          {originalPrice > price && (
            <del>₹{originalPrice.toLocaleString("en-IN")}</del>
          )}
        </div>

        <button
          className="add-cart-button"
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
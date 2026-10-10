import { Link, useNavigate, useParams } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";
import { useShop } from "../../context/ShopContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sellerProducts = [] } = useSeller();
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const product = sellerProducts.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className="empty-products">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const originalPrice = Number(product.originalPrice) || 0;
  const price = Number(product.price) || 0;
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="product-details-page">
      <div className="breadcrumb">
        <Link to="/home">Home</Link> /{" "}
        <Link to="/shop">Shop</Link> / {product.name}
      </div>

      <div className="product-details-layout">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <span className="product-brand">{product.brand}</span>
          <h1>{product.name}</h1>

          <p className="details-rating">
            ⭐ {product.rating} / 5
            <span> Customer rating</span>
          </p>

          <div className="details-price">
            <strong>₹{price.toLocaleString("en-IN")}</strong>
            {originalPrice > price && (
              <del>₹{originalPrice.toLocaleString("en-IN")}</del>
            )}
            {discount > 0 && (
              <span className="details-discount">{discount}% OFF</span>
            )}
          </div>

          <p className="tax-note">
            Inclusive of applicable taxes
          </p>

          <div className="stock-status">
            {product.stock > 0
              ? `✓ In stock — ${product.stock} available`
              : "Currently unavailable"}
          </div>

          <div className="details-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="delivery-box">
            <h3>🚚 Delivery Information</h3>
            <p>Delivery estimates will be available at checkout.</p>
            <p>Secure checkout and order tracking are planned features.</p>
          </div>

          <div className="details-actions">
            <button
              className="add-cart-button"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="buy-now-button"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
            >
              {wishlist.some((item) => String(item.id) === String(product.id))
                ? "Saved"
                : "Save to Wishlist"}
            </button>
          </div>

          <div className="product-benefits">
            <span>🔒 Secure shopping</span>
            <span>📦 Order tracking planned</span>
            <span>💬 Customer support</span>
          </div>
        </div>
      </div>

      <section className="details-description">
        <h2>Product Information</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Availability:</strong> {product.stock > 0 ? "In stock" : "Out of stock"}</p>
      </section>
    </div>
  );
}

export default ProductDetails;

import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Wishlist() {
  const { wishlist, toggleWishlist, moveToCart } = useShop();

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">YOUR FAVORITES</p>
          <h1>My Wishlist ♡</h1>
          <p>Keep the products you love in one place.</p>
        </div>

        <span className="shop-result-count">
          {wishlist.length} saved
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-products">
          <div className="empty-cart-icon">♡</div>
          <h2>Your wishlist is waiting</h2>
          <p>Explore products and save your favorites here.</p>
          <Link to="/shop">Explore Products</Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </Link>

              <div className="product-info">
                <span className="product-brand">{product.brand}</span>

                <Link
                  to={`/product/${product.id}`}
                  className="product-name"
                >
                  {product.name}
                </Link>

                <p className="product-rating">
                  ⭐ {product.rating}
                </p>

                <div className="product-price">
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>
                  <del>
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </del>
                </div>

                <button
                  className="add-cart-button"
                  disabled={product.stock === 0}
                  onClick={() => moveToCart(product)}
                >
                  Move to Cart
                </button>

                <button
                  className="wishlist-remove"
                  onClick={() => toggleWishlist(product)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
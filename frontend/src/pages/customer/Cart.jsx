
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart
  } = useShop();

  const shipping = cartTotal === 0 || cartTotal >= 499 ? 0 : 49;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="customer-page">
        <div className="empty-products">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">YOUR SHOPPING BAG</p>
          <h1>Shopping Cart</h1>
          <p>{cart.length} different products in your cart</p>
        </div>

        <Link to="/shop" className="secondary-link">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-info">
                <span className="product-brand">{item.brand}</span>
                <Link
                  to={`/product/${item.id}`}
                  className="product-name"
                >
                  {item.name}
                </Link>

                <p className="cart-item-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <div className="quantity-control">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={item.quantity >= item.stock}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <strong className="cart-line-total">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          {shipping > 0 && (
            <p className="shipping-hint">
              Add ₹{(499 - cartTotal).toLocaleString("en-IN")} more
              for free shipping.
            </p>
          )}

          <div className="summary-row summary-total">
            <strong>Total</strong>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

          <p className="secure-note">
            🔒 Your shopping details are kept in this browser.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
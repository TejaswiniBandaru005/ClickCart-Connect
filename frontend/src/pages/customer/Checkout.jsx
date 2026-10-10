import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { useCustomer } from "../../context/CustomerContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, removeFromCart } = useShop();
  const { addresses, placeOrder } = useCustomer();

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((address) => address.isDefault)?.id ??
      addresses[0]?.id ??
      ""
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");

  const shipping = cart.length === 0 ? 0 : cartTotal >= 499 ? 0 : 49;
  const total = cartTotal + shipping;

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty. Add products before checkout.");
      return;
    }

    const address = addresses.find(
      (item) => String(item.id) === String(selectedAddress)
    );

    if (!address) {
      setError("Please add and select a delivery address first.");
      return;
    }

    const order = placeOrder(
      cart.map((item) => ({ ...item })),
      total,
      { ...address, paymentMethod }
    );

    cart.forEach((item) => removeFromCart(item.id));
    navigate(`/order-success/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <main className="customer-page">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/shop" className="primary-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="customer-page checkout-page">
      <div className="page-heading">
        <h1>Checkout</h1>
        <p>Confirm your delivery details and place your order.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <form className="checkout-layout" onSubmit={handlePlaceOrder}>
        <section className="checkout-main">
          <div className="checkout-panel">
            <div className="panel-heading">
              <h2>1. Delivery Address</h2>
              <Link to="/account/addresses">Manage addresses</Link>
            </div>

            {addresses.length === 0 ? (
              <div className="empty-address-message">
                <p>You haven't saved a delivery address yet.</p>
                <Link to="/account/addresses" className="primary-button">
                  Add Delivery Address
                </Link>
              </div>
            ) : (
              <div className="checkout-address-list">
                {addresses.map((address) => (
                  <label className="checkout-address" key={address.id}>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      value={address.id}
                      checked={String(selectedAddress) === String(address.id)}
                      onChange={() => setSelectedAddress(address.id)}
                    />
                    <div>
                      <strong>
                        {address.name}{" "}
                        {address.isDefault && (
                          <span className="default-tag">Default</span>
                        )}
                      </strong>
                      <p>{address.phone}</p>
                      <p>
                        {address.line1}, {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>
                      <small>{address.type || "Home"}</small>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="checkout-panel">
            <h2>2. Payment Method</h2>

            <div className="payment-options">
              {["Cash on Delivery", "UPI", "Credit / Debit Card"].map(
                (method) => (
                  <label className="payment-option" key={method}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>{method}</span>
                  </label>
                )
              )}
            </div>

            <p className="muted-text">
              Demo only: selecting UPI or a card does not process a real
              payment.
            </p>
          </div>

          <div className="checkout-panel">
            <h2>3. Order Items ({cart.length})</h2>

            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Price Details</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
          <div className="summary-row summary-total">
            <strong>Total</strong>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          {addresses.length === 0 ? (
            <Link
              to="/account/addresses"
              className="primary-button full-width"
            >
              Add Address to Continue
            </Link>
          ) : (
            <button className="primary-button full-width" type="submit">
              Place Order
            </button>
          )}

          <p className="muted-text">
            By placing your order, you confirm your delivery details.
          </p>
          <Link to="/cart" className="back-to-cart">
            ← Return to Cart
          </Link>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;

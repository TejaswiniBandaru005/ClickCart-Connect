import { Link, useParams } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

function OrderSuccess() {
  const { id } = useParams();
  const { orders } = useCustomer();

  const order = orders.find((item) => String(item.id) === String(id));

  if (!order) {
    return (
      <main className="customer-page">
        <div className="empty-state">
          <h2>Order not found</h2>
          <p>This order may not exist in your current browser session.</p>
          <Link to="/account/orders" className="primary-button">
            View My Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="customer-page success-page">
      <section className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with ShopSphere.</p>

        <div className="success-order-details">
          <div>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>
          <div>
            <span>Order Date</span>
            <strong>
              {new Date(order.date).toLocaleDateString("en-IN")}
            </strong>
          </div>
          <div>
            <span>Order Status</span>
            <strong>{order.status}</strong>
          </div>
          <div>
            <span>Order Total</span>
            <strong>₹{Number(order.total).toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <p className="success-note">
          Your order has been saved in this demo application.
        </p>

        <div className="success-actions">
          <Link to={`/track-order/${order.id}`} className="primary-button">
            Track Order
          </Link>
          <Link to="/account/orders" className="secondary-button">
            My Orders
          </Link>
          <Link to="/shop" className="secondary-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;

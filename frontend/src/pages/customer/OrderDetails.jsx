
import { Link, useParams } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

function OrderDetails() {
  const { id } = useParams();
  const { orders } = useCustomer();

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <div className="customer-page">
        <div className="empty-products">
          <h2>Order not found</h2>
          <p>This order may not exist in your browser's saved data.</p>
          <Link to="/account/orders">Back to My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">PURCHASE INFORMATION</p>
          <h1>Order Details</h1>
          <p>Order ID: {order.id}</p>
        </div>

        <span className="order-status">{order.status}</span>
      </div>

      <section className="customer-order-card">
        <h2>Items Ordered</h2>

        {order.items.map((item) => (
          <div className="order-detail-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <strong>{item.name}</strong>
              <p>Quantity: {item.quantity}</p>
              <p>
                ₹{item.price.toLocaleString("en-IN")} each
              </p>
            </div>

            <strong>
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </strong>
          </div>
        ))}

        <div className="summary-row summary-total">
          <strong>Order Total</strong>
          <strong>
            ₹{Number(order.total).toLocaleString("en-IN")}
          </strong>
        </div>
      </section>

      <section className="customer-order-card">
        <h2>Delivery Address</h2>
        {order.address ? (
          <>
            <p><strong>{order.address.name}</strong></p>
            <p>{order.address.phone}</p>
            <p>
              {order.address.line1}, {order.address.city},{" "}
              {order.address.state} - {order.address.pincode}
            </p>
          </>
        ) : (
          <p>No delivery address was saved for this order.</p>
        )}
      </section>

      <Link to="/account/orders" className="secondary-link">
        ← Back to My Orders
      </Link>
    </div>
  );
}

export default OrderDetails;
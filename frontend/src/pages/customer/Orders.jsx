
import { Link } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

function Orders() {
  const { orders } = useCustomer();

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">YOUR PURCHASES</p>
          <h1>My Orders</h1>
          <p>View your purchases and check order status.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-products">
          <div className="empty-cart-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
          <Link to="/shop">Start Shopping</Link>
        </div>
      ) : (
        <div className="customer-order-list">
          {orders.map((order) => (
            <article className="customer-order-card" key={order.id}>
              <div className="customer-order-header">
                <div>
                  <span className="order-label">ORDER ID</span>
                  <strong>{order.id}</strong>
                </div>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <p>
                Placed on{" "}
                {new Date(order.date).toLocaleDateString("en-IN")}
              </p>

              <p>
                {order.items.reduce(
                  (count, item) => count + item.quantity,
                  0
                )}{" "}
                item(s)
              </p>

              <div className="customer-order-footer">
                <strong>
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </strong>

                <Link to={`/account/orders/${order.id}`}>
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
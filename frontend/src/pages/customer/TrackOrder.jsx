import { Link, useParams } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

const trackingSteps = [
  {
    status: "Placed",
    title: "Order Placed",
    description: "Your order has been recorded.",
  },
  {
    status: "Confirmed",
    title: "Order Confirmed",
    description: "The order has been confirmed.",
  },
  {
    status: "Shipped",
    title: "Shipped",
    description: "Your package has left the seller.",
  },
  {
    status: "Out for Delivery",
    title: "Out for Delivery",
    description: "Your package is on its way to you.",
  },
  {
    status: "Delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
  },
];

function TrackOrder() {
  const { id } = useParams();
  const { orders } = useCustomer();

  const order = orders.find((item) => String(item.id) === String(id));

  if (!order) {
    return (
      <main className="customer-page">
        <div className="empty-state">
          <h2>Order not found</h2>
          <p>Check the order ID or open your order history.</p>
          <Link to="/account/orders" className="primary-button">
            View My Orders
          </Link>
        </div>
      </main>
    );
  }

  const currentStep = trackingSteps.findIndex(
    (step) => step.status === order.status
  );
  const activeStep = Math.max(currentStep, 0);

  return (
    <main className="customer-page track-order-page">
      <div className="page-heading">
        <h1>Track Your Order</h1>
        <p>
          Order ID: <strong>{order.id}</strong>
        </p>
      </div>

      <section className="tracking-card">
        <div className="tracking-summary">
          <div>
            <span>Order Date</span>
            <strong>
              {new Date(order.date).toLocaleDateString("en-IN")}
            </strong>
          </div>
          <div>
            <span>Current Status</span>
            <strong className="order-status">{order.status}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>₹{Number(order.total).toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <h2>Delivery Progress</h2>

        <div className="tracking-timeline">
          {trackingSteps.map((step, index) => {
            const isComplete = index < activeStep;
            const isCurrent = index === activeStep;

            return (
              <div
                key={step.status}
                className={`tracking-step ${isComplete ? "completed" : ""} ${
                  isCurrent ? "current" : ""
                }`}
              >
                <div className="tracking-marker">
                  {isComplete ? "✓" : index + 1}
                </div>
                <div className="tracking-step-content">
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                  {isCurrent && (
                    <span className="tracking-current-label">
                      Current status
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="muted-text">
          Tracking is simulated in this frontend. Live shipping updates require
          a backend and courier integration.
        </p>

        <div className="tracking-actions">
          <Link
            to={`/account/orders/${order.id}`}
            className="primary-button"
          >
            View Order Details
          </Link>
          <Link to="/account/orders" className="secondary-button">
            All Orders
          </Link>
        </div>
      </section>
    </main>
  );
}

export default TrackOrder;

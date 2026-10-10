
import { useEffect, useState } from "react";

function readOrders() {
  try {
    const saved = localStorage.getItem("shopsphere-orders");
    const orders = saved ? JSON.parse(saved) : [];
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function SellerOrders() {
  const [orders, setOrders] = useState(readOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    function refreshOrders() {
      setOrders(readOrders());
    }

    window.addEventListener("storage", refreshOrders);
    window.addEventListener("focus", refreshOrders);

    return () => {
      window.removeEventListener("storage", refreshOrders);
      window.removeEventListener("focus", refreshOrders);
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = String(order.id)
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Customer Orders</h1>
          <p>Review orders placed in your ShopSphere demo store.</p>
        </div>
      </div>

      <section className="seller-panel">
        <div className="seller-filters">
          <input
            type="search"
            placeholder="Search by order ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All</option>
            <option>Placed</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="seller-empty-message">
            <h3>No orders found</h3>
            <p>Orders will appear here after customers complete checkout.</p>
          </div>
        ) : (
          <div className="seller-table-wrapper">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {new Date(order.date).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      {order.items?.reduce(
                        (sum, item) => sum + Number(item.quantity || 1),
                        0
                      ) ?? 0}
                    </td>
                    <td>
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </td>
                    <td>{order.address?.paymentMethod || "Not specified"}</td>
                    <td>
                      <span className="stock-badge stock-good">
                        {order.status || "Placed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default SellerOrders;
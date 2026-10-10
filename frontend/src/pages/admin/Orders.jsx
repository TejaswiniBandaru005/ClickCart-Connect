
import { useEffect, useState } from "react";

const ORDER_STORAGE_KEY = "shopsphere-orders";

const orderStatuses = [
  "Placed",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function readOrders() {
  try {
    const saved = localStorage.getItem(ORDER_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function AdminOrders() {
  const [orders, setOrders] = useState(readOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

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

  function updateOrderStatus(orderId, status) {
    const updatedOrders = orders.map((order) =>
      String(order.id) === String(orderId) ? { ...order, status } : order
    );

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setMessage(`Order ${orderId} updated to "${status}".`);
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = String(order.id)
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div>
          <h1>Order Management</h1>
          <p>Review customer orders and update their status.</p>
        </div>
      </div>

      <section className="admin-panel">
        {message && (
          <p className="admin-success-message" role="status">
            {message}
          </p>
        )}

        <div className="admin-toolbar">
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
            {orderStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {new Date(order.date).toLocaleDateString("en-IN")}
                  </td>
                  <td>{order.items?.length ?? 0}</td>
                  <td>₹{Number(order.total || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <span className="admin-status">{order.status}</span>
                  </td>
                  <td>
                    <select
                      aria-label={`Update status for order ${order.id}`}
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value)
                      }
                    >
                      {orderStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="admin-empty-cell">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminOrders;
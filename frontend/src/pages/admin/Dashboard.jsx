
import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";
import { useCustomer } from "../../context/CustomerContext";

function AdminDashboard() {
  const { sellerProducts } = useSeller();
  const { orders } = useCustomer();

  const totalProducts = sellerProducts.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "Placed"
  ).length;
  const lowStock = sellerProducts.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: "📦" },
    { label: "Total Orders", value: totalOrders, icon: "🛍️" },
    {
      label: "Recorded Order Value",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: "💰",
    },
    { label: "Pending Orders", value: pendingOrders, icon: "⏳" },
  ];

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>ShopSphere marketplace overview</p>
        </div>
        <span className="admin-demo-label">Demo Data</span>
      </div>

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <span className="admin-stat-icon">{stat.icon}</span>
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
          </article>
        ))}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Recent Orders</h2>
          <Link to="/admin/orders">View All</Link>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <h3>No orders yet</h3>
            <p>Orders placed through checkout will appear here.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Order Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {new Date(order.date).toLocaleDateString("en-IN")}
                    </td>
                    <td>{order.items?.length ?? 0}</td>
                    <td>
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span className="admin-status">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Marketplace Health</h2>
          <span>{lowStock} low-stock product(s)</span>
        </div>

        <div className="admin-quick-links">
          <Link to="/admin/users">👥 Manage Users</Link>
          <Link to="/admin/sellers">🏪 Manage Sellers</Link>
          <Link to="/admin/products">📦 Manage Products</Link>
          <Link to="/admin/orders">🧾 Manage Orders</Link>
          <Link to="/admin/finance">💳 Finance</Link>
          <Link to="/admin/analytics">📊 Analytics</Link>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
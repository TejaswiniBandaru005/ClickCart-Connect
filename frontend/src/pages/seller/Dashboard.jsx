
import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";

function Dashboard() {
  const { sellerProducts } = useSeller();

  const totalProducts = sellerProducts.length;
  const totalStock = sellerProducts.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0
  );
  const lowStock = sellerProducts.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;
  const outOfStock = sellerProducts.filter(
    (product) => product.stock === 0
  ).length;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: "📦" },
    { label: "Units in Stock", value: totalStock, icon: "🏬" },
    { label: "Low Stock Products", value: lowStock, icon: "⚠️" },
    { label: "Out of Stock", value: outOfStock, icon: "❌" },
  ];

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Seller Dashboard</h1>
          <p>Welcome back! Here's your store overview.</p>
        </div>
        <Link to="/seller/products/add" className="primary-button">
          + Add Product
        </Link>
      </div>

      <section className="seller-stats-grid">
        {stats.map((stat) => (
          <article className="seller-stat-card" key={stat.label}>
            <span className="seller-stat-icon">{stat.icon}</span>
            <p>{stat.label}</p>
            <h2>{stat.value.toLocaleString("en-IN")}</h2>
          </article>
        ))}
      </section>

      <section className="seller-panel">
        <div className="seller-panel-heading">
          <h2>Recently Added Products</h2>
          <Link to="/seller/products">View All</Link>
        </div>

        {sellerProducts.length === 0 ? (
          <p>No products yet. Add your first product to get started.</p>
        ) : (
          <div className="seller-table-wrapper">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="seller-product-cell">
                        <img src={product.image} alt={product.name} />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                    <td>
                      <span
                        className={
                          product.stock === 0
                            ? "stock-badge stock-empty"
                            : product.stock <= 5
                            ? "stock-badge stock-low"
                            : "stock-badge stock-good"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="seller-quick-links">
        <Link to="/seller/products">Manage Products →</Link>
        <Link to="/seller/inventory">Manage Inventory →</Link>
        <Link to="/seller/orders">View Orders →</Link>
        <Link to="/seller/analytics">View Analytics →</Link>
      </section>
    </main>
  );
}

export default Dashboard;
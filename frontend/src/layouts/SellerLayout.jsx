import { NavLink, Outlet, Link } from "react-router-dom";

const sellerLinks = [
  { label: "Dashboard", path: "/seller/dashboard", icon: "▦" },
  { label: "Products", path: "/seller/products", icon: "▣" },
  { label: "Add Product", path: "/seller/products/add", icon: "+" },
  { label: "Inventory", path: "/seller/inventory", icon: "☷" },
  { label: "Orders", path: "/seller/orders", icon: "📦" },
  { label: "Analytics", path: "/seller/analytics", icon: "↗" },
  { label: "Settings", path: "/seller/settings", icon: "⚙" },
];

export default function SellerLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/seller/dashboard" className="admin-brand">
          <span className="admin-brand-mark">S</span>
          <span>
            ShopSphere
            <small>SELLER CONSOLE</small>
          </span>
        </Link>

        <nav className="admin-navigation" aria-label="Seller navigation">
          {sellerLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/seller/dashboard"}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Link to="/home" className="admin-store-link">
          ← Back to Store
        </Link>
      </aside>

      <div className="admin-layout-main">
        <header className="admin-topbar">
          <div>
            <strong>Seller Panel</strong>
            <span>Manage your ShopSphere listings</span>
          </div>
          <Link to="/login" className="admin-logout-link">
            Login page
          </Link>
        </header>

        <div className="admin-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

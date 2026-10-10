import { NavLink, Outlet, Link } from "react-router-dom";

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "▦" },
  { label: "Users", path: "/admin/users", icon: "♙" },
  { label: "Sellers", path: "/admin/sellers", icon: "♧" },
  { label: "Products", path: "/admin/products", icon: "▣" },
  { label: "Orders", path: "/admin/orders", icon: "☷" },
  { label: "Finance", path: "/admin/finance", icon: "₹" },
  { label: "Marketing & Coupons", path: "/admin/marketing", icon: "%" },
  { label: "Analytics", path: "/admin/analytics", icon: "↗" },
  { label: "Support Tickets", path: "/admin/support-tickets", icon: "✉" },
  { label: "Role Management", path: "/admin/roles", icon: "♙" },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: "◷" },
  { label: "Settings", path: "/admin/settings", icon: "⚙" },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/admin/dashboard" className="admin-brand">
          <span className="admin-brand-mark">S</span>
          <span>
            ShopSphere
            <small>ADMIN CONSOLE</small>
          </span>
        </Link>

        <nav className="admin-navigation" aria-label="Admin navigation">
          {adminLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin/dashboard"}
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
            <strong>Administration</strong>
            <span>Manage your ShopSphere store</span>
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

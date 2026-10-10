
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const accountLinks = [
  {
    icon: "👤",
    title: "My Profile",
    description: "Manage your name and personal information",
    path: "/account/profile"
  },
  {
    icon: "📦",
    title: "My Orders",
    description: "View your orders and their status",
    path: "/account/orders"
  },
  {
    icon: "♡",
    title: "Wishlist",
    description: "View your saved favorite products",
    path: "/account/wishlist"
  },
  {
    icon: "📍",
    title: "Saved Addresses",
    description: "Manage your delivery addresses",
    path: "/account/addresses"
  },
  {
    icon: "⚙️",
    title: "Account Settings",
    description: "Manage your account preferences",
    path: "/account/settings"
  }
];

function Account() {
  const { cartCount, wishlist } = useShop();

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">YOUR SHOPSPHERE ACCOUNT</p>
          <h1>My Account</h1>
          <p>Manage your shopping experience in one place.</p>
        </div>
      </div>

      <div className="account-welcome">
        <div className="account-avatar-large">👤</div>
        <div>
          <h2>Welcome to ShopSphere!</h2>
          <p>Manage your profile, orders, and saved items below.</p>
          <Link to="/login">Sign in to your account</Link>
        </div>
      </div>

      <div className="account-stats">
        <Link to="/account/orders" className="account-stat-card">
          <span>📦</span>
          <div>
            <strong>My Orders</strong>
            <p>View purchase history</p>
          </div>
        </Link>

        <Link to="/account/wishlist" className="account-stat-card">
          <span>♡</span>
          <div>
            <strong>{wishlist.length} Saved Items</strong>
            <p>Your wishlist</p>
          </div>
        </Link>

        <Link to="/cart" className="account-stat-card">
          <span>🛒</span>
          <div>
            <strong>{cartCount} Items</strong>
            <p>Your shopping cart</p>
          </div>
        </Link>
      </div>

      <h2 className="account-section-title">Account Management</h2>

      <div className="account-links-grid">
        {accountLinks.map((item) => (
          <Link
            to={item.path}
            className="account-link-card"
            key={item.path}
          >
            <span className="account-link-icon">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span className="account-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Account;
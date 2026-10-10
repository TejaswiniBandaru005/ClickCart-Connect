import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useShop();

  const [search, setSearch] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopSphereUser"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("shopSphereUser")));
      } catch {
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shopSphereUser");
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }

  };

  return (
    <>

      {/* Top announcement bar */}

      <div className="top-bar">

        <div>
          🚚 Free shipping on orders above ₹499
        </div>

        <div className="top-links">
          <Link to="/account/orders">Track Order</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/support">Support</Link>
        </div>

      </div>


      {/* Main Navbar */}

      <header className="navbar">

        <div className="navbar-container">


          {/* Logo */}

          <Link to="/home" className="logo">

            <span className="logo-icon">
              🛍️
            </span>

            <span>
              Shop<span className="logo-highlight">Sphere</span>
            </span>

          </Link>


          {/* Navigation */}

          <nav className="main-nav">

            <Link to="/home">
              Home
            </Link>

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/deals" className="deals-link">
              Deals
            </Link>

          </nav>


          {/* Search */}

          <form
            className="search-container"
            onSubmit={handleSearch}
          >

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search products, brands and categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
              Search
            </button>

          </form>


          {/* Actions */}

          <div className="navbar-actions">


            {/* Wishlist */}

            <button
              className="nav-action"
              onClick={() => navigate("/account/wishlist")}
            >

              <span>♡</span>

              <small>
                Wishlist
              </small>

            </button>


            {/* Cart */}

            <button
              className="nav-action"
              onClick={() => navigate("/cart")}
            >

              <span>
                🛒
              </span>

              <small>
                Cart
              </small>

              <b className="cart-count">
                {cartCount}
              </b>

            </button>


            {/* Account */}

            <div className="account-container">

              <button
                className="nav-action"
                onClick={() => setShowAccount(!showAccount)}
              >

                <span>
                  👤
                </span>

                <small>
                  Account
                </small>

              </button>


              {showAccount && (
                <div className="account-dropdown">
                  {user ? (
                    <>
                      <div className="account-header">
                        <div className="account-avatar">👤</div>
                        <div>
                          <strong>{user.name}</strong>
                          <p>{user.role ? `${user.role} account` : "Logged in"}</p>
                        </div>
                      </div>

                      <button onClick={() => navigate("/account/profile")}>👤 My Profile</button>
                      <button onClick={() => navigate("/account/orders")}>📦 My Orders</button>
                      <button onClick={() => navigate("/account/wishlist")}>♡ Wishlist</button>
                      <hr />
                      <button onClick={handleLogout}>🚪 Logout</button>
                    </>
                  ) : (
                    <>
                      <div className="account-header">
                        <div className="account-avatar">👤</div>
                        <div>
                          <strong>Welcome!</strong>
                          <p>Login to your account</p>
                        </div>
                      </div>

                      <button onClick={() => navigate("/login?role=customer")}>🔐 Login</button>
                      <button onClick={() => navigate("/register")}>✨ Create Account</button>
                      <hr />
                      <button onClick={() => navigate("/account/orders")}>📦 My Orders</button>
                      <button onClick={() => navigate("/account/wishlist")}>♡ Wishlist</button>
                      <button onClick={() => navigate("/account/profile")}>👤 My Profile</button>
                    </>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </header>

    </>
  );
}

export default Navbar;
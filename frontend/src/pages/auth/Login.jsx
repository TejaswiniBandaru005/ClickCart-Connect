import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || "customer";

  const [email, setEmail] = useState(
    selectedRole === "admin"
      ? "admin@gmail.com"
      : selectedRole === "seller"
        ? "seller@gmail.com"
        : ""
  );
  const [password, setPassword] = useState("");

  const roleLabels = {
    customer: "Customer Login",
    seller: "Seller Login",
    admin: "Admin Login",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const finalRole =
      selectedRole === "admin" || email === "admin@gmail.com"
        ? "admin"
        : selectedRole === "seller" || email === "seller@gmail.com"
          ? "seller"
          : "customer";

    const user = {
      name:
        finalRole === "admin"
          ? "Admin User"
          : finalRole === "seller"
            ? "Seller User"
            : "Customer User",
      email: email || "customer@example.com",
      role: finalRole,
    };

    localStorage.setItem("shopSphereUser", JSON.stringify(user));

    if (finalRole === "admin") {
      navigate("/admin/dashboard");
    } else if (finalRole === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <div className="auth-role-pill">
          {roleLabels[selectedRole] || "Customer Login"}
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your ShopSphere account
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-link">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

        </form>

        <div className="register-text">
          Don't have an account?

          <button onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>

      </div>

    </div>
  );
}

export default Login;
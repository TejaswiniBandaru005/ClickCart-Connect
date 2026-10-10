import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Registration data:", form);

    alert("Registration successful!");

    navigate("/login");
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join ShopSphere today
        </p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Account Type</label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CUSTOMER">
              Customer
            </option>

            <option value="SELLER">
              Seller
            </option>
          </select>

          <button
            className="login-button"
            type="submit"
          >
            Create Account
          </button>

        </form>

        <div className="register-text">

          Already have an account?

          <button onClick={() => navigate("/login")}>
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;
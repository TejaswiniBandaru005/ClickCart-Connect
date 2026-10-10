
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

function Profile() {
  const { profile, saveProfile } = useCustomer();
  const [form, setForm] = useState(profile);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    saveProfile(form);
    setMessage("Profile saved successfully.");
  }

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">PERSONAL INFORMATION</p>
          <h1>My Profile</h1>
          <p>Manage your ShopSphere profile details.</p>
        </div>
        <Link to="/account" className="secondary-link">
          ← My Account
        </Link>
      </div>

      <form className="customer-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Enter your email"
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            placeholder="Enter your phone number"
          />
        </label>

        {message && <p className="success-message">{message}</p>}

        <button className="checkout-button" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
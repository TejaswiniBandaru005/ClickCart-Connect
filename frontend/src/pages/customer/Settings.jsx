
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

function Settings() {
  const { settings, setSettings } = useCustomer();
  const [message, setMessage] = useState("");

  function toggleSetting(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key]
    }));
    setMessage("Your preference has been updated.");
  }

  const options = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive important account updates by email."
    },
    {
      key: "orderUpdates",
      title: "Order Updates",
      description: "Keep informed about order and delivery progress."
    },
    {
      key: "promotions",
      title: "Offers and Promotions",
      description: "Receive information about sales and special offers."
    }
  ];

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">PREFERENCES & SECURITY</p>
          <h1>Account Settings</h1>
          <p>Choose how you want to use ShopSphere.</p>
        </div>
        <Link to="/account" className="secondary-link">
          ← My Account
        </Link>
      </div>

      <section className="settings-panel">
        <h2>Notification Preferences</h2>
        <p className="settings-intro">
          Control which notifications you want to receive.
        </p>

        {options.map((option) => (
          <div className="setting-row" key={option.key}>
            <div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>

            <label className="switch-control">
              <input
                type="checkbox"
                checked={settings[option.key]}
                onChange={() => toggleSetting(option.key)}
              />
              <span className="switch-slider" />
            </label>
          </div>
        ))}

        {message && <p className="success-message">{message}</p>}
      </section>

      <section className="settings-panel">
        <h2>Account Security</h2>
        <p className="settings-intro">
          Protect your account and keep your details up to date.
        </p>

        <div className="setting-row">
          <div>
            <h3>Change Password</h3>
            <p>Update your account password.</p>
          </div>

          <Link to="/change-password" className="address-action">
            Change
          </Link>
        </div>

        <div className="setting-row">
          <div>
            <h3>Personal Information</h3>
            <p>Review your name, email, and phone number.</p>
          </div>

          <Link to="/account/profile" className="address-action">
            View Profile
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Settings;
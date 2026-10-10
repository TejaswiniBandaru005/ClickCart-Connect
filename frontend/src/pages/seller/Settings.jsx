import { useState } from "react";

const STORAGE_KEY = "shopsphere-seller-settings";

const initialSettings = {
  storeName: "My ShopSphere Store",
  supportEmail: "seller@shopsphere.example",
  returnWindowDays: 7,
};

function SellerSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      return {
        ...initialSettings,
        ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
      };
    } catch {
      return initialSettings;
    }
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((current) => ({ ...current, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleaned = {
      ...settings,
      storeName: settings.storeName.trim(),
      supportEmail: settings.supportEmail.trim(),
      returnWindowDays: Number(settings.returnWindowDays),
    };

    if (!cleaned.storeName || !cleaned.supportEmail) {
      setMessage("Store name and support email are required.");
      return;
    }

    if (!Number.isFinite(cleaned.returnWindowDays) || cleaned.returnWindowDays < 0) {
      setMessage("Enter a valid return window.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    setSettings(cleaned);
    setMessage("Settings saved in this browser.");
  };

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Seller Settings</h1>
          <p>Update store details stored in this browser.</p>
        </div>
      </div>

      <form className="seller-panel" onSubmit={handleSubmit}>
        <label>
          Store name
          <input
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Support email
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Return window (days)
          <input
            type="number"
            min="0"
            name="returnWindowDays"
            value={settings.returnWindowDays}
            onChange={handleChange}
          />
        </label>
        {message && <p>{message}</p>}
        <button className="primary-button" type="submit">
          Save Settings
        </button>
      </form>
    </main>
  );
}

export default SellerSettings;

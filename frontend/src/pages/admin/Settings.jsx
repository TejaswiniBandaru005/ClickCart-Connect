import { useState } from "react";

const STORAGE_KEY = "shopsphere-admin-settings";

const initialSettings = {
  storeName: "ShopSphere",
  supportEmail: "support@shopsphere.example",
  currency: "INR",
  freeShippingMinimum: 499,
  maintenanceMode: false,
  allowRegistration: true,
  showOutOfStock: false,
};

export default function AdminSettings() {
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

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setSettings((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : name === "freeShippingMinimum"
            ? value
            : value,
    }));
    setMessage("");
  }

  function saveSettings(event) {
    event.preventDefault();

    const minimum = Number(settings.freeShippingMinimum);
    if (!Number.isFinite(minimum) || minimum < 0) {
      setMessage("Enter a valid free-shipping minimum.");
      return;
    }

    const cleaned = {
      ...settings,
      freeShippingMinimum: minimum,
      storeName: settings.storeName.trim(),
      supportEmail: settings.supportEmail.trim(),
    };

    if (!cleaned.storeName || !cleaned.supportEmail) {
      setMessage("Store name and support email are required.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    setSettings(cleaned);
    setMessage("Settings saved in this browser.");
  }

  function resetSettings() {
    setSettings(initialSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSettings));
    setMessage("Settings restored to defaults.");
  }

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CONFIGURATION</p>
          <h1>Store Settings</h1>
          <p>Manage basic ShopSphere storefront preferences.</p>
        </div>
      </div>

      <form className="admin-panel admin-settings-form" onSubmit={saveSettings}>
        <h2>Store Information</h2>

        <label>
          Store Name
          <input
            name="storeName"
            value={settings.storeName}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Support Email
          <input
            name="supportEmail"
            type="email"
            value={settings.supportEmail}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Store Currency
          <select
            name="currency"
            value={settings.currency}
            onChange={updateField}
          >
            <option value="INR">Indian Rupee (INR ₹)</option>
            <option value="USD">US Dollar (USD $)</option>
          </select>
        </label>

        <label>
          Free Shipping Minimum
          <input
            name="freeShippingMinimum"
            type="number"
            min="0"
            step="1"
            value={settings.freeShippingMinimum}
            onChange={updateField}
            required
          />
        </label>

        <div className="admin-settings-options">
          <label>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={updateField}
            />
            Maintenance mode
          </label>
          <label>
            <input
              type="checkbox"
              name="allowRegistration"
              checked={settings.allowRegistration}
              onChange={updateField}
            />
            Allow new registrations
          </label>
          <label>
            <input
              type="checkbox"
              name="showOutOfStock"
              checked={settings.showOutOfStock}
              onChange={updateField}
            />
            Show out-of-stock products
          </label>
        </div>

        <div className="admin-action-group">
          <button className="admin-primary-button" type="submit">
            Save Settings
          </button>
          <button
            className="table-action"
            type="button"
            onClick={resetSettings}
          >
            Reset Defaults
          </button>
        </div>

        {message && (
          <p className="admin-feedback" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="admin-note">
        These settings are saved locally. They will not change storefront
        behavior until the relevant pages and backend read these values.
      </p>
    </main>
  );
}

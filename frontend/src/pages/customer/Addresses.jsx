
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

const emptyAddress = {
  name: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
  type: "Home",
  isDefault: false
};

function Addresses() {
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress
  } = useCustomer();

  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId !== null) {
      updateAddress(editingId, form);
    } else {
      addAddress(form);
    }

    setForm(emptyAddress);
    setEditingId(null);
    setMessage("Address saved successfully.");
  }

  function startEdit(address) {
    setForm({ ...address });
    setEditingId(address.id);
    setMessage("");
  }

  function cancelEdit() {
    setForm(emptyAddress);
    setEditingId(null);
    setMessage("");
  }

  return (
    <div className="customer-page">
      <div className="customer-page-heading">
        <div>
          <p className="eyebrow">DELIVERY INFORMATION</p>
          <h1>Saved Addresses</h1>
          <p>Manage your delivery locations.</p>
        </div>
        <Link to="/account" className="secondary-link">
          ← My Account
        </Link>
      </div>

      <form className="customer-form" onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Edit Address" : "Add New Address"}</h2>

        <label>
          Full Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label>
          Phone Number
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>

        <label>
          Street Address
          <textarea
            required
            rows={2}
            value={form.line1}
            onChange={(e) => setForm({ ...form, line1: e.target.value })}
          />
        </label>

        <div className="form-two-columns">
          <label>
            City
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </label>

          <label>
            State
            <input
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </label>
        </div>

        <div className="form-two-columns">
          <label>
            PIN Code
            <input
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            />
          </label>

          <label>
            Address Type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <label className="default-address-option">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) =>
              setForm({ ...form, isDefault: e.target.checked })
            }
          />
          Set as default address
        </label>

        {message && <p className="success-message">{message}</p>}

        <div className="form-actions">
          <button className="checkout-button" type="submit">
            {editingId !== null ? "Update Address" : "Save Address"}
          </button>

          {editingId !== null && (
            <button
              className="cancel-button"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="account-section-title">Your Addresses</h2>

      {addresses.length === 0 ? (
        <div className="empty-products">
          <h2>No saved addresses</h2>
          <p>Add an address using the form above.</p>
        </div>
      ) : (
        <div className="saved-address-grid">
          {addresses.map((address) => (
            <article className="customer-order-card" key={address.id}>
              <div className="customer-order-header">
                <strong>{address.type}</strong>
                {address.isDefault && (
                  <span className="order-status">Default</span>
                )}
              </div>

              <h3>{address.name}</h3>
              <p>{address.phone}</p>
              <p>
                {address.line1}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>

              <div className="form-actions">
                <button
                  className="address-action"
                  onClick={() => startEdit(address)}
                >
                  Edit
                </button>

                <button
                  className="address-action delete-address"
                  onClick={() => {
                    if (window.confirm("Delete this saved address?")) {
                      deleteAddress(address.id);
                      if (editingId === address.id) cancelEdit();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Addresses;
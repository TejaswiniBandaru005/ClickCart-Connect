import { useEffect, useState } from "react";

const STORAGE_KEY = "shopsphere-admin-coupons";

const defaultCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    discount: 10,
    type: "Percentage",
    minimumOrder: 499,
    active: true,
  },
  {
    id: 2,
    code: "SAVE100",
    discount: 100,
    type: "Fixed",
    minimumOrder: 999,
    active: true,
  },
];

export default function AdminMarketing() {
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultCoupons;
    } catch {
      return defaultCoupons;
    }
  });

  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "Percentage",
    minimumOrder: "0",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
  }, [coupons]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setMessage("");
  }

  function addCoupon(event) {
    event.preventDefault();

    const code = form.code.trim().toUpperCase();
    const discount = Number(form.discount);
    const minimumOrder = Number(form.minimumOrder);

    if (!/^[A-Z0-9_-]{3,20}$/.test(code)) {
      setMessage("Use 3–20 letters, numbers, hyphens, or underscores for the code.");
      return;
    }

    if (coupons.some((coupon) => coupon.code === code)) {
      setMessage("That coupon code already exists.");
      return;
    }

    if (!Number.isFinite(discount) || discount <= 0) {
      setMessage("Enter a discount greater than zero.");
      return;
    }

    if (form.type === "Percentage" && discount > 100) {
      setMessage("A percentage discount cannot exceed 100%.");
      return;
    }

    if (!Number.isFinite(minimumOrder) || minimumOrder < 0) {
      setMessage("Enter a valid minimum order value.");
      return;
    }

    setCoupons((previous) => [
      ...previous,
      {
        id: Date.now(),
        code,
        discount,
        type: form.type,
        minimumOrder,
        active: true,
      },
    ]);

    setForm({
      code: "",
      discount: "",
      type: "Percentage",
      minimumOrder: "0",
    });

    setMessage("Coupon created successfully.");
  }

  function toggleCoupon(id) {
    setCoupons((previous) =>
      previous.map((coupon) =>
        coupon.id === id
          ? { ...coupon, active: !coupon.active }
          : coupon
      )
    );
  }

  function deleteCoupon(id) {
    setCoupons((previous) =>
      previous.filter((coupon) => coupon.id !== id)
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">PROMOTIONS</p>
          <h1>Marketing & Coupons</h1>
          <p>Create and manage promotional codes for your storefront.</p>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Create a Coupon</h2>
        </div>

        <form className="admin-coupon-form" onSubmit={addCoupon}>
          <label>
            Coupon Code
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. FESTIVE20"
              maxLength={20}
              required
            />
          </label>

          <label>
            Discount Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Percentage">Percentage (%)</option>
              <option value="Fixed">Fixed amount (₹)</option>
            </select>
          </label>

          <label>
            Discount Value
            <input
              name="discount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.discount}
              onChange={handleChange}
              placeholder={form.type === "Percentage" ? "10" : "100"}
              required
            />
          </label>

          <label>
            Minimum Order (₹)
            <input
              name="minimumOrder"
              type="number"
              min="0"
              step="1"
              value={form.minimumOrder}
              onChange={handleChange}
              required
            />
          </label>

          <button className="admin-primary-button" type="submit">
            Create Coupon
          </button>
        </form>

        {message && (
          <p className="admin-feedback" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Coupon List</h2>
          <span>{coupons.length} total</span>
        </div>

        {coupons.length === 0 ? (
          <div className="admin-empty">
            <h3>No coupons created</h3>
            <p>Create your first coupon using the form above.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Minimum Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>
                      <strong>{coupon.code}</strong>
                    </td>
                    <td>
                      {coupon.type === "Percentage"
                        ? `${coupon.discount}%`
                        : `₹${coupon.discount}`}
                    </td>
                    <td>₹{Number(coupon.minimumOrder).toLocaleString("en-IN")}</td>
                    <td>
                      <span
                        className={`admin-status ${
                          coupon.active ? "admin-status-active" : "admin-status-inactive"
                        }`}
                      >
                        {coupon.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-group">
                        <button
                          className="table-action"
                          type="button"
                          onClick={() => toggleCoupon(coupon.id)}
                        >
                          {coupon.active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          className="table-action delete-action"
                          type="button"
                          onClick={() => deleteCoupon(coupon.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="admin-note">
        Coupons are saved locally for this demo. They will not apply to checkout
        until coupon validation and discount calculation are connected to the
        shopping cart.
      </p>
    </main>
  );
}

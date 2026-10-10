import { useState } from "react";

const STORAGE_KEY = "shopsphere-support-tickets";

export default function Support() {
  const [form, setForm] = useState({
    customer: "",
    subject: "",
    category: "Order",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setFeedback("");
  }

  function submitTicket(event) {
    event.preventDefault();

    const ticket = {
      id: `TKT-${Date.now().toString().slice(-8)}`,
      customer: form.customer.trim(),
      subject: form.subject.trim(),
      category: form.category,
      message: form.message.trim(),
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(existing)) throw new Error("Invalid ticket data");

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([ticket, ...existing])
      );

      setForm({
        customer: "",
        subject: "",
        category: "Order",
        message: "",
      });
      setFeedback(`Your demo ticket ${ticket.id} has been submitted.`);
    } catch {
      setFeedback("Unable to save your ticket in this browser.");
    }
  }

  return (
    <main className="support-page">
      <section className="support-intro">
        <p className="admin-eyebrow">WE'RE HERE TO HELP</p>
        <h1>ShopSphere Support</h1>
        <p>Send us your question and create a demo support ticket.</p>
      </section>

      <section className="support-content">
        <div className="support-info">
          <h2>How can we help?</h2>
          <p>Choose the category that best matches your question.</p>
          <div className="support-info-card">
            <h3>Orders and delivery</h3>
            <p>Questions about order status, tracking, and delivery.</p>
          </div>
          <div className="support-info-card">
            <h3>Returns and refunds</h3>
            <p>Questions about return eligibility and refund procedures.</p>
          </div>
          <div className="support-info-card">
            <h3>Account and payments</h3>
            <p>Help with your profile or checkout experience.</p>
          </div>
        </div>

        <form className="support-form" onSubmit={submitTicket}>
          <h2>Submit a ticket</h2>

          <label>
            Your Name
            <input
              name="customer"
              value={form.customer}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              maxLength={150}
            />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Order</option>
              <option>Returns</option>
              <option>Payment</option>
              <option>Account</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={2000}
              rows={5}
            />
          </label>

          <button className="admin-primary-button" type="submit">
            Submit Ticket
          </button>

          {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
        </form>
      </section>

      <p className="admin-note">
        This demo stores tickets in browser storage. Do not submit sensitive
        personal or payment information.
      </p>
    </main>
  );
}

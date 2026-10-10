import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="policy-page">
      <p className="admin-eyebrow">GET IN TOUCH</p>
      <h1>Contact Us</h1>
      <p>Send a message and we will get back to you in this demo store.</p>

      {sent ? (
        <p>Thanks for reaching out. Your message has been recorded locally.</p>
      ) : (
        <form className="support-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="primary-button" type="submit">
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}

export default Contact;

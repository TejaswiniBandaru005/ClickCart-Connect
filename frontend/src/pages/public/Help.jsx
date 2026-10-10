import { Link } from "react-router-dom";

function Help() {
  return (
    <main className="policy-page">
      <p className="admin-eyebrow">HELP CENTER</p>
      <h1>How can we help?</h1>
      <section>
        <h2>Orders</h2>
        <p>
          Track purchases from <Link to="/account/orders">My Orders</Link> or
          submit a question on the{" "}
          <Link to="/support">Customer Support</Link> page.
        </p>
      </section>
      <section>
        <h2>Returns</h2>
        <p>
          Review the <Link to="/returns-policy">Returns & Refunds</Link> policy
          before starting a return.
        </p>
      </section>
      <section>
        <h2>Account</h2>
        <p>
          Update your profile, addresses, and preferences from{" "}
          <Link to="/account">My Account</Link>.
        </p>
      </section>
    </main>
  );
}

export default Help;

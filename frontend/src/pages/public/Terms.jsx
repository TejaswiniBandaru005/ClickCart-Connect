export default function Terms() {
  return (
    <main className="policy-page">
      <p className="admin-eyebrow">PLEASE READ</p>
      <h1>Terms & Conditions</h1>
      <p className="policy-updated">Demo terms for the ShopSphere project</p>

      <section>
        <h2>1. Using the Store</h2>
        <p>
          Users should provide accurate information, keep their account
          credentials secure, and use the store lawfully.
        </p>
      </section>

      <section>
        <h2>2. Product Information</h2>
        <p>
          Product names, images, prices, ratings, and stock in this demo may be
          sample data. A production store must provide accurate product
          descriptions, availability, and pricing.
        </p>
      </section>

      <section>
        <h2>3. Orders and Payments</h2>
        <p>
          An order should be treated according to the store's confirmed order
          and payment procedures. The current frontend checkout does not process
          real payments.
        </p>
      </section>

      <section>
        <h2>4. Changes and Contact</h2>
        <p>
          A production business should publish its applicable terms and a
          reliable contact method for questions or disputes.
        </p>
      </section>

      <p className="admin-note">
        These sample terms are for a development project and are not legal
        advice.
      </p>
    </main>
  );
}

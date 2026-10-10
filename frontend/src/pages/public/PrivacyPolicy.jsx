export default function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <p className="admin-eyebrow">YOUR INFORMATION</p>
      <h1>Privacy Policy</h1>
      <p className="policy-updated">Demo policy for the ShopSphere project</p>

      <section>
        <h2>1. Information Used</h2>
        <p>
          An e-commerce application may process account details, delivery
          addresses, order history, support requests, and technical information
          needed to operate its services.
        </p>
      </section>

      <section>
        <h2>2. How Information Is Used</h2>
        <p>
          Information may be used to manage accounts, process orders, provide
          customer support, prevent fraud, and improve the shopping experience.
        </p>
      </section>

      <section>
        <h2>3. Storage and Security</h2>
        <p>
          This ShopSphere frontend demo stores some information in browser
          localStorage. Browser storage is not suitable for secrets or sensitive
          payment data. A production system needs server-side access controls
          and appropriate security measures.
        </p>
      </section>

      <section>
        <h2>4. Your Choices</h2>
        <p>
          A production application should provide appropriate processes for
          access, correction, deletion, and other privacy requests, subject to
          applicable law.
        </p>
      </section>

      <p className="admin-note">
        Replace this example with a policy reviewed for your actual data
        practices and applicable legal requirements before deployment.
      </p>
    </main>
  );
}

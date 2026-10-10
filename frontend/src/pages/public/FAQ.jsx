function FAQ() {
  const items = [
    {
      q: "Do I need an account to shop?",
      a: "You can browse products without signing in. Checkout in this demo uses addresses saved in your browser.",
    },
    {
      q: "How do payments work?",
      a: "Checkout is a frontend simulation. No real payment is processed.",
    },
    {
      q: "Can I sell on ShopSphere?",
      a: "Use seller@gmail.com on the login page to open the seller dashboard in this demo.",
    },
    {
      q: "How do I open the admin panel?",
      a: "Use admin@gmail.com on the login page to open the admin console.",
    },
  ];

  return (
    <main className="policy-page">
      <p className="admin-eyebrow">COMMON QUESTIONS</p>
      <h1>FAQ</h1>
      {items.map((item) => (
        <section key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </section>
      ))}
    </main>
  );
}

export default FAQ;

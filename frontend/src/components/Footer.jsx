import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">


      {/* Newsletter */}

      <section className="newsletter">

        <div>

          <h2>
            Stay in the ShopSphere loop
          </h2>

          <p>
            Get exclusive deals, new arrivals and special offers
            delivered directly to your inbox.
          </p>

        </div>


        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </section>


      {/* Footer links */}

      <div className="footer-main">


        {/* Company */}

        <div className="footer-column">

          <h3>
            ShopSphere
          </h3>

          <p>
            Your trusted online marketplace for
            quality products from verified sellers.
          </p>

          <div className="social-icons">

            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>in</span>

          </div>

        </div>


        {/* Shop */}

        <div className="footer-column">

          <h3>
            Shop
          </h3>

          <Link to="/shop">
            All Products
          </Link>

          <Link to="/categories">
            Categories
          </Link>

          <Link to="/deals">
            Deals
          </Link>

          <Link to="/new-arrivals">
            New Arrivals
          </Link>

          <Link to="/best-sellers">
            Best Sellers
          </Link>

        </div>


        {/* Customer Service */}

        <div className="footer-column">

          <h3>
            Customer Service
          </h3>

          <Link to="/help">
            Help Center
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/faq">
            FAQ
          </Link>

          <Link to="/returns-policy">
            Returns & Refunds
          </Link>

          <Link to="/account/orders">
            Track Order
          </Link>

        </div>


        {/* Company */}

        <div className="footer-column">

          <h3>
            Company
          </h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Careers
          </Link>

          <Link to="/contact">
            Become a Seller
          </Link>

          <Link to="/contact">
            Partner With Us
          </Link>

        </div>


        {/* Policies */}

        <div className="footer-column">

          <h3>
            Policies
          </h3>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/returns-policy">
            Return Policy
          </Link>

        </div>

      </div>


      {/* Payment methods */}

      <div className="payment-section">

        <div>

          <strong>
            Secure Payments
          </strong>

          <span>💳</span>
          <span>📱 UPI</span>
          <span>🏦 Net Banking</span>
          <span>💰 COD</span>

        </div>

        <div>

          <strong>
            100% Secure
          </strong>

          🔒 SSL Encrypted

        </div>

      </div>
      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 ShopSphere. All rights reserved.
        </p>

        <p>
          Made with ❤️ for shoppers
        </p>

      </div>

    </footer>

  );
}

export default Footer;
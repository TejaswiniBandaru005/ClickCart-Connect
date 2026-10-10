import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useSeller } from "../../context/SellerContext";

const homeCategories = [
  { id: "Electronics", icon: "📱", title: "Electronics" },
  { id: "Fashion", icon: "👕", title: "Fashion" },
  { id: "Home", icon: "🏠", title: "Home & Living" },
  { id: "Beauty", icon: "💄", title: "Beauty" },
  { id: "Sports", icon: "⚽", title: "Sports" },
  { id: "Books", icon: "📚", title: "Books" }
];

function Home() {
  const navigate = useNavigate();
  const { sellerProducts: products = [] } = useSeller();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>

      {/* Hero */}

      <section className="hero">

        <div>

          <p className="hero-small">
            SHOPSPHERE EXCLUSIVE
          </p>

          <h1>
            Discover Products
            <br />
            You'll Love
          </h1>

          <p>
            Shop thousands of products from trusted sellers.
          </p>

          <button
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>

        </div>

      </section>


      {/* Categories */}

      <section className="section">

        <h2>Shop by Category</h2>

        <div className="category-grid">
          {homeCategories.map((category) => (
            <div
              key={category.id}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(category.id)}`)
              }
            >
              {category.icon}
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>

      </section>


      {/* Featured */}

      <section className="section">

        <h2>Featured Products</h2>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>


      {/* Flash Deals */}

      <section className="deal-section">

        <h2>⚡ Flash Deals</h2>

        <p>
          Limited-time offers. Grab them before they're gone!
        </p>

        <button onClick={() => navigate("/deals")}>
          View Deals
        </button>

      </section>

    </div>
  );
}

export default Home;
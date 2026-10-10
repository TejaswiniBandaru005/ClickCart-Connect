import { Link } from "react-router-dom";

const categories = [
  {
    id: "Electronics",
    title: "Electronics",
    description: "Smartphones, headphones and gadgets",
    icon: "📱"
  },
  {
    id: "Fashion",
    title: "Fashion",
    description: "Clothing, shoes and accessories",
    icon: "👕"
  },
  {
    id: "Home",
    title: "Home & Living",
    description: "Decor, lighting and home essentials",
    icon: "🏠"
  },
  {
    id: "Beauty",
    title: "Beauty",
    description: "Skincare and personal care",
    icon: "✨"
  },
  {
    id: "Sports",
    title: "Sports",
    description: "Fitness gear and outdoor essentials",
    icon: "⚽"
  },
  {
    id: "Books",
    title: "Books",
    description: "Novels, study reads and more",
    icon: "📚"
  }
];

function Categories() {
  return (
    <div className="categories-page">
      <section className="shop-heading">
        <div>
          <p className="eyebrow">EXPLORE SHOPSPHERE</p>
          <h1>Shop by Category</h1>
          <p>Find the right products for your everyday needs.</p>
        </div>
      </section>

      <div className="categories-page-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${encodeURIComponent(category.id)}`}
            className="category-tile"
          >
            <div className="category-tile-icon">
              {category.icon}
            </div>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <span>Explore Products →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
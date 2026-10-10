import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useSeller } from "../../context/SellerContext";

function CategoryDetails() {
  const { id } = useParams();
  const { sellerProducts: products = [] } = useSeller();

  const categoryName = decodeURIComponent(id || "");

  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="category-details-page">
      <div className="breadcrumb">
        <Link to="/home">Home</Link> /{" "}
        <Link to="/categories">Categories</Link> / {categoryName}
      </div>

      <section className="shop-heading">
        <div>
          <p className="eyebrow">EXPLORE THE COLLECTION</p>
          <h1>{categoryName}</h1>
          <p>Discover products selected for this category.</p>
        </div>
        <span>{categoryProducts.length} products</span>
      </section>

      {categoryProducts.length > 0 ? (
        <div className="product-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <h2>No products in this category yet</h2>
          <p>Explore our other available collections.</p>
          <Link to="/categories">Browse Categories</Link>
        </div>
      )}
    </div>
  );
}

export default CategoryDetails;
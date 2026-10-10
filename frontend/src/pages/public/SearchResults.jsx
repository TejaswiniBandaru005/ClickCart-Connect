import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useSeller } from "../../context/SellerContext";

function SearchResults() {
  const { sellerProducts: products = [] } = useSeller();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return [];

    return products.filter((product) =>
      [
        product.name,
        product.brand,
        product.category,
        product.description
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [products, query]);

  return (
    <div className="search-results-page">
      <section className="shop-heading">
        <div>
          <p className="eyebrow">SEARCH SHOPSPHERE</p>
          <h1>Search Results</h1>
          <p>
            {query
              ? `Results for "${query}"`
              : "Enter a product name in the search bar to begin."}
          </p>
        </div>
        <span>{results.length} results</span>
      </section>

      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <h2>No matching products</h2>
          <p>Try a different product name, brand, or category.</p>
          <Link to="/shop">Browse All Products</Link>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useSeller } from "../../context/SellerContext";

function Shop() {
  const { sellerProducts: products = [] } = useSeller();
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  const brands = [
    "All",
    ...new Set(products.map((p) => p.brand))
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      result = result.filter((p) => p.brand === brand);
    }

    if (priceRange === "under1000") {
      result = result.filter((p) => p.price < 1000);
    } else if (priceRange === "1000to5000") {
      result = result.filter(
        (p) => p.price >= 1000 && p.price <= 5000
      );
    } else if (priceRange === "5000to20000") {
      result = result.filter(
        (p) => p.price > 5000 && p.price <= 20000
      );
    } else if (priceRange === "above20000") {
      result = result.filter((p) => p.price > 20000);
    }

    result = result.filter((p) => p.rating >= minRating);

    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, category, brand, priceRange, minRating, sortBy]);

  const resetFilters = () => {
    setCategory("All");
    setBrand("All");
    setPriceRange("All");
    setMinRating(0);
    setSortBy("popular");
  };

  return (
    <div className="shop-page">
      <section className="shop-heading">
        <div>
          <p className="eyebrow">FIND YOUR FAVORITES</p>
          <h1>Shop All Products</h1>
          <p>Discover great products at prices you'll love.</p>
        </div>

        <div className="shop-result-count">
          {filteredProducts.length} products
        </div>
      </section>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-heading">
            <h2>Filters</h2>
            <button onClick={resetFilters}>Clear all</button>
          </div>

          <div className="filter-group">
            <h3>Categories</h3>

            {categories.map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="category"
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                {item === "All" ? "All Categories" : item}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>

            {[
              { label: "All prices", value: "All" },
              { label: "Under ₹1,000", value: "under1000" },
              { label: "₹1,000–₹5,000", value: "1000to5000" },
              { label: "₹5,000–₹20,000", value: "5000to20000" },
              { label: "Above ₹20,000", value: "above20000" }
            ].map((item) => (
              <label className="filter-option" key={item.value}>
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === item.value}
                  onChange={() => setPriceRange(item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Brands</h3>

            {brands.map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="brand"
                  checked={brand === item}
                  onChange={() => setBrand(item)}
                />
                {item === "All" ? "All Brands" : item}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Customer Rating</h3>

            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
              />
              All ratings
            </label>

            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={minRating === 4}
                onChange={() => setMinRating(4)}
              />
              ⭐ 4.0 and above
            </label>

            <label className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={minRating === 4.5}
                onChange={() => setMinRating(4.5)}
              />
              ⭐ 4.5 and above
            </label>
          </div>
        </aside>

        <section className="shop-products">
          <div className="shop-toolbar">
            <span>
              Showing {filteredProducts.length} products
            </span>

            <label>
              Sort by:{" "}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <h2>No products found</h2>
              <p>Try changing your filters to see more products.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Shop;
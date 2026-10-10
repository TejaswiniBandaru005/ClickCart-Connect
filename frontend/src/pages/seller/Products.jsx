
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";

function Products() {
  const { sellerProducts, deleteProduct } = useSeller();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(sellerProducts.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return sellerProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [sellerProducts, search, category]);

  function handleDelete(product) {
    const confirmed = window.confirm(
      `Delete "${product.name}" from your product list?`
    );

    if (confirmed) deleteProduct(product.id);
  }

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Manage Products</h1>
          <p>Search, review, and manage your store listings.</p>
        </div>
        <Link to="/seller/products/add" className="primary-button">
          + Add Product
        </Link>
      </div>

      <section className="seller-panel">
        <div className="seller-filters">
          <input
            type="search"
            placeholder="Search product or brand..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p className="seller-result-count">
          {filteredProducts.length} product(s) found
        </p>

        {filteredProducts.length === 0 ? (
          <p>No products match your search.</p>
        ) : (
          <div className="seller-table-wrapper">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="seller-product-cell">
                        <img src={product.image} alt={product.name} />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="seller-actions">
                        <Link
                          to="/seller/inventory"
                          className="table-action"
                        >
                          Stock
                        </Link>
                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
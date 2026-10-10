
import { useMemo, useState } from "react";
import { useSeller } from "../../context/SellerContext";

function AdminProducts() {
  const { sellerProducts, deleteProduct } = useSeller();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(sellerProducts.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(
    () =>
      sellerProducts.filter((product) => {
        const matchesSearch =
          `${product.name} ${product.brand}`
            .toLowerCase()
            .includes(search.toLowerCase());

        return (
          matchesSearch &&
          (category === "All" || product.category === category)
        );
      }),
    [sellerProducts, search, category]
  );

  function handleDelete(product) {
    if (
      window.confirm(
        `Remove "${product.name}" from the marketplace demo catalog?`
      )
    ) {
      deleteProduct(product.id);
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div>
          <h1>Product Management</h1>
          <p>Review marketplace listings and remove unwanted products.</p>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-toolbar">
          <input
            type="search"
            placeholder="Search products or brands..."
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

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
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
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="table-action delete-action"
                      onClick={() => handleDelete(product)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="admin-empty-cell">
                    No products match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminProducts;
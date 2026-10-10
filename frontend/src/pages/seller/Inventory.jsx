
import { useMemo, useState } from "react";
import { useSeller } from "../../context/SellerContext";

function Inventory() {
  const { sellerProducts, updateStock } = useSeller();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [quantities, setQuantities] = useState({});

  const filteredProducts = useMemo(() => {
    return sellerProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Low Stock" && product.stock > 0 && product.stock <= 5) ||
        (filter === "Out of Stock" && product.stock === 0) ||
        (filter === "In Stock" && product.stock > 5);

      return matchesSearch && matchesFilter;
    });
  }, [sellerProducts, search, filter]);

  function saveStock(product) {
    const entered = quantities[product.id] ?? String(product.stock);
    const value = Number(entered);

    if (String(entered).trim() === "" || !Number.isInteger(value) || value < 0) {
      window.alert("Enter a valid non-negative whole number.");
      return;
    }

    updateStock(product.id, value);
    setQuantities((current) => {
      const next = { ...current };
      delete next[product.id];
      return next;
    });
  }

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Inventory Management</h1>
          <p>Monitor and update stock levels across your products.</p>
        </div>
      </div>

      <section className="seller-panel">
        <div className="seller-filters">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div className="seller-table-wrapper">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Current Stock</th>
                <th>Stock Status</th>
                <th>Update Quantity</th>
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
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`stock-badge ${
                        product.stock === 0
                          ? "stock-empty"
                          : product.stock <= 5
                          ? "stock-low"
                          : "stock-good"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock <= 5
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                  <td>
                    <input
                      className="stock-input"
                      type="number"
                      min="0"
                      step="1"
                      aria-label={`New stock for ${product.name}`}
                      value={quantities[product.id] ?? String(product.stock)}
                      onChange={(event) =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: event.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action"
                      onClick={() => saveStock(product)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <p className="seller-empty-message">No matching products found.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Inventory;
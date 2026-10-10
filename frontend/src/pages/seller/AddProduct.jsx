
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSeller } from "../../context/SellerContext";

const initialForm = {
  name: "",
  brand: "",
  category: "Electronics",
  price: "",
  originalPrice: "",
  stock: "",
  image: "",
  description: "",
};

function AddProduct() {
  const { addProduct } = useSeller();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.brand.trim() ||
      !form.image.trim() ||
      !form.description.trim()
    ) {
      setError("Please complete all product fields.");
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      !Number.isFinite(Number(form.originalPrice)) ||
      Number(form.price) <= 0 ||
      Number(form.originalPrice) < Number(form.price)
    ) {
      setError("Enter valid prices. Original price must be at least the selling price.");
      return;
    }

    if (
      form.stock.trim() === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      setError("Stock must be a non-negative whole number.");
      return;
    }

    try {
      new URL(form.image);
    } catch {
      setError("Enter a valid image URL starting with https:// or http://.");
      return;
    }

    addProduct(form);
    navigate("/seller/products");
  }

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Add New Product</h1>
          <p>Enter the details to create a product listing.</p>
        </div>
        <Link to="/seller/products" className="secondary-button">
          Back to Products
        </Link>
      </div>

      <form className="seller-panel seller-product-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <div className="seller-form-grid">
          <label>
            Product Name *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              required
            />
          </label>

          <label>
            Brand *
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. SoundPro"
              required
            />
          </label>

          <label>
            Category *
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
              <option>Beauty</option>
              <option>Sports</option>
              <option>Books</option>
            </select>
          </label>

          <label>
            Selling Price (₹) *
            <input
              type="number"
              name="price"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Original Price (₹) *
            <input
              type="number"
              name="originalPrice"
              min="0.01"
              step="0.01"
              value={form.originalPrice}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Available Stock *
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="seller-full-field">
          Product Image URL *
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/product-image.jpg"
            required
          />
        </label>

        {form.image && (
          <div className="seller-image-preview">
            <span>Image Preview</span>
            <img
              src={form.image}
              alt="Product preview"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              onLoad={(event) => {
                event.currentTarget.style.display = "block";
              }}
            />
          </div>
        )}

        <label className="seller-full-field">
          Description *
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe the product, its features, and benefits..."
            required
          />
        </label>

        <div className="seller-form-actions">
          <button type="submit" className="primary-button">
            Save Product
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setForm(initialForm)}
          >
            Clear Form
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddProduct;
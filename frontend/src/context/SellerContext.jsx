
import { createContext, useContext, useEffect, useState } from "react";
import { products as initialProducts } from "../data/products";

const SellerContext = createContext(null);
const STORAGE_KEY = "shopsphere-seller-products";

function readProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProducts;

    const parsed = JSON.parse(saved);
    const savedIds = new Set(parsed.map((product) => String(product.id)));
    const missing = initialProducts.filter(
      (product) => !savedIds.has(String(product.id))
    );

    return missing.length ? [...parsed, ...missing] : parsed;
  } catch {
    return initialProducts;
  }
}

export function SellerProvider({ children }) {
  const [sellerProducts, setSellerProducts] = useState(readProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sellerProducts));
  }, [sellerProducts]);

  function addProduct(product) {
    const newProduct = {
      ...product,
      id: `seller-${Date.now()}`,
      rating: 0,
      stock: Number(product.stock),
      price: Number(product.price),
      originalPrice: Number(product.originalPrice),
    };

    setSellerProducts((current) => [newProduct, ...current]);
    return newProduct;
  }

  function updateStock(productId, newStock) {
    setSellerProducts((current) =>
      current.map((product) =>
        String(product.id) === String(productId)
          ? { ...product, stock: Math.max(0, Number(newStock) || 0) }
          : product
      )
    );
  }

  function updateProduct(productId, updates) {
    setSellerProducts((current) =>
      current.map((product) =>
        String(product.id) === String(productId)
          ? { ...product, ...updates }
          : product
      )
    );
  }

  function deleteProduct(productId) {
    setSellerProducts((current) =>
      current.filter((product) => String(product.id) !== String(productId))
    );
  }

  return (
    <SellerContext.Provider
      value={{
        sellerProducts,
        addProduct,
        updateStock,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export function useSeller() {
  const context = useContext(SellerContext);

  if (!context) {
    throw new Error("useSeller must be used inside SellerProvider");
  }

  return context;
}
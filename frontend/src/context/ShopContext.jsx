
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ShopContext = createContext(null);

const CART_KEY = "shopsphere-cart";
const WISHLIST_KEY = "shopsphere-wishlist";

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY));
  const [wishlist, setWishlist] = useState(() =>
    readStorage(WISHLIST_KEY)
  );

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                )
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: Math.min(quantity, product.stock)
        }
      ];
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setCart((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(quantity, item.stock)
            }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((current) =>
      current.filter((item) => item.id !== productId)
    );
  }

  function toggleWishlist(product) {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item.id === product.id
      );

      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
    });
  }

  function removeFromWishlist(productId) {
    setWishlist((current) =>
      current.filter((item) => item.id !== productId)
    );
  }

  function moveToCart(product) {
    addToCart(product);
    removeFromWishlist(product.id);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        removeFromWishlist,
        moveToCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}
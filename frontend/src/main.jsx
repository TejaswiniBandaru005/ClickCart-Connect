
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { SellerProvider } from "./context/SellerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomerProvider>
      <SellerProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </SellerProvider>
    </CustomerProvider>
  </StrictMode>
);
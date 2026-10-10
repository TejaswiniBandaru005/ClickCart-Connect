import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import SellerLayout from "./layouts/SellerLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import LandingPage from "./pages/public/LandingPage";
import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import Categories from "./pages/public/Categories";
import CategoryDetails from "./pages/public/CategoryDetails";
import SearchResults from "./pages/public/SearchResults";
import ProductDetails from "./pages/public/ProductDetails";
import Deals from "./pages/public/Deals";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Help from "./pages/public/Help";
import FAQ from "./pages/public/FAQ";
import NewArrivals from "./pages/public/NewArrivals";
import BestSellers from "./pages/public/BestSellers";
import Terms from "./pages/public/Terms";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import ReturnsPolicy from "./pages/public/ReturnsPolicy";
import Support from "./pages/public/Support";

import Cart from "./pages/customer/Cart";
import Account from "./pages/customer/Account";
import Profile from "./pages/customer/Profile";
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Wishlist from "./pages/customer/Wishlist";
import Addresses from "./pages/customer/Addresses";
import Settings from "./pages/customer/Settings";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";
import TrackOrder from "./pages/customer/TrackOrder";

import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import AddProduct from "./pages/seller/AddProduct";
import Inventory from "./pages/seller/Inventory";
import SellerOrders from "./pages/seller/Orders";
import SellerAnalytics from "./pages/seller/Analytics";
import SellerSettings from "./pages/seller/Settings";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminSellers from "./pages/admin/Sellers";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminFinance from "./pages/admin/Finance";
import AdminMarketing from "./pages/admin/Marketing";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminSupportTickets from "./pages/admin/SupportTickets";
import AdminRoles from "./pages/admin/Roles";
import AdminAuditLogs from "./pages/admin/AuditLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/orders/:id" element={<OrderDetails />} />
          <Route path="/account/wishlist" element={<Wishlist />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/seller" element={<SellerLayout />}>
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="settings" element={<SellerSettings />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="sellers" element={<AdminSellers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="marketing" element={<AdminMarketing />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="support-tickets" element={<AdminSupportTickets />} />
          <Route path="roles" element={<AdminRoles />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

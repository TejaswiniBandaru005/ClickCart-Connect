import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
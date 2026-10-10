import { useMemo } from "react";
import { useSeller } from "../../context/SellerContext";
import { useCustomer } from "../../context/CustomerContext";

function SellerAnalytics() {
  const { sellerProducts = [] } = useSeller();
  const { orders = [] } = useCustomer();

  const analytics = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );
    const totalUnits = sellerProducts.reduce(
      (sum, product) => sum + Number(product.stock || 0),
      0
    );
    const lowStock = sellerProducts.filter(
      (product) => product.stock > 0 && product.stock <= 5
    ).length;

    return {
      revenue,
      totalUnits,
      lowStock,
      averageOrder: orders.length ? revenue / orders.length : 0,
    };
  }, [sellerProducts, orders]);

  return (
    <main className="seller-page">
      <div className="seller-heading">
        <div>
          <h1>Seller Analytics</h1>
          <p>A snapshot of catalog and order activity in this demo.</p>
        </div>
      </div>

      <section className="seller-stats-grid">
        <article className="seller-stat-card">
          <p>Products</p>
          <h2>{sellerProducts.length}</h2>
        </article>
        <article className="seller-stat-card">
          <p>Units in Stock</p>
          <h2>{analytics.totalUnits.toLocaleString("en-IN")}</h2>
        </article>
        <article className="seller-stat-card">
          <p>Low Stock</p>
          <h2>{analytics.lowStock}</h2>
        </article>
        <article className="seller-stat-card">
          <p>Orders Recorded</p>
          <h2>{orders.length}</h2>
        </article>
        <article className="seller-stat-card">
          <p>Order Value</p>
          <h2>₹{analytics.revenue.toLocaleString("en-IN")}</h2>
        </article>
        <article className="seller-stat-card">
          <p>Average Order</p>
          <h2>₹{Math.round(analytics.averageOrder).toLocaleString("en-IN")}</h2>
        </article>
      </section>
    </main>
  );
}

export default SellerAnalytics;

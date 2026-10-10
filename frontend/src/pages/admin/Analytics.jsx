import { useMemo } from "react";
import { useSeller } from "../../context/SellerContext";
import { useCustomer } from "../../context/CustomerContext";

export default function AdminAnalytics() {
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

    const categoryMap = {};

    sellerProducts.forEach((product) => {
      const category = product.category || "Uncategorized";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const categories = Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const statusMap = {};

    orders.forEach((order) => {
      const status = order.status || "Placed";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const statuses = Object.entries(statusMap).map(([name, count]) => ({
      name,
      count,
    }));

    const dailyMap = {};

    orders.forEach((order) => {
      const date = order.date
        ? new Date(order.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : "Unknown";

      if (!dailyMap[date]) {
        dailyMap[date] = { date, revenue: 0, count: 0 };
      }

      dailyMap[date].revenue += Number(order.total || 0);
      dailyMap[date].count += 1;
    });

    const dailySales = Object.values(dailyMap).slice(-7);

    return {
      revenue,
      totalUnits,
      categories,
      statuses,
      dailySales,
      averageOrder: orders.length ? revenue / orders.length : 0,
    };
  }, [sellerProducts, orders]);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const maxCategory = Math.max(
    1,
    ...analytics.categories.map((item) => item.count)
  );

  const maxStatus = Math.max(
    1,
    ...analytics.statuses.map((item) => item.count)
  );

  const maxDailyRevenue = Math.max(
    1,
    ...analytics.dailySales.map((item) => item.revenue)
  );

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">BUSINESS INSIGHTS</p>
          <h1>Analytics</h1>
          <p>Understand your store's current performance.</p>
        </div>
      </div>

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Total Products</span>
          <strong>{sellerProducts.length}</strong>
          <small>Products in the management catalog</small>
        </article>

        <article className="admin-stat-card">
          <span>Total Inventory Units</span>
          <strong>{analytics.totalUnits.toLocaleString("en-IN")}</strong>
          <small>Sum of recorded stock quantities</small>
        </article>

        <article className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
          <small>Orders recorded in the customer context</small>
        </article>

        <article className="admin-stat-card">
          <span>Average Order Value</span>
          <strong>{formatMoney(analytics.averageOrder)}</strong>
          <small>Recorded order value divided by order count</small>
        </article>
      </section>

      <section className="admin-chart-grid">
        <article className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Products by Category</h2>
          </div>

          {analytics.categories.length === 0 ? (
            <p className="admin-chart-empty">No product data available.</p>
          ) : (
            <div className="admin-bar-list">
              {analytics.categories.map((item) => (
                <div className="admin-bar-item" key={item.name}>
                  <div className="admin-bar-label">
                    <span>{item.name}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="admin-bar-track">
                    <div
                      className="admin-bar-fill"
                      style={{
                        width: `${(item.count / maxCategory) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Orders by Status</h2>
          </div>

          {analytics.statuses.length === 0 ? (
            <p className="admin-chart-empty">No order data available.</p>
          ) : (
            <div className="admin-bar-list">
              {analytics.statuses.map((item) => (
                <div className="admin-bar-item" key={item.name}>
                  <div className="admin-bar-label">
                    <span>{item.name}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="admin-bar-track">
                    <div
                      className="admin-bar-fill admin-bar-fill-secondary"
                      style={{
                        width: `${(item.count / maxStatus) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Recorded Sales by Order Date</h2>
          <span>{formatMoney(analytics.revenue)} total order value</span>
        </div>

        {analytics.dailySales.length === 0 ? (
          <div className="admin-empty">
            <h3>Not enough data yet</h3>
            <p>Sales information will appear after customers place orders.</p>
          </div>
        ) : (
          <div className="admin-sales-chart">
            {analytics.dailySales.map((item, index) => (
              <div className="admin-sales-column" key={`${item.date}-${index}`}>
                <strong>{formatMoney(item.revenue)}</strong>
                <div className="admin-sales-track">
                  <div
                    className="admin-sales-bar"
                    style={{
                      height: `${Math.max(
                        item.revenue > 0 ? 6 : 0,
                        (item.revenue / maxDailyRevenue) * 100
                      )}%`,
                    }}
                    title={`${item.date}: ${formatMoney(item.revenue)}`}
                  />
                </div>
                <span>{item.date}</span>
                <small>{item.count} order(s)</small>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="admin-note">
        Analytics are calculated from locally recorded demo data. Sales are
        grouped by order date, not payment settlement date, and are not verified
        financial revenue.
      </p>
    </main>
  );
}

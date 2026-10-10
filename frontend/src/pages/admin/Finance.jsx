import { useMemo } from "react";
import { useCustomer } from "../../context/CustomerContext";

export default function AdminFinance() {
  const { orders = [] } = useCustomer();

  const stats = useMemo(() => {
    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    );

    const deliveredRevenue = deliveredOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const pendingRevenue = orders
      .filter((order) => order.status !== "Delivered" && order.status !== "Cancelled")
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    const averageOrderValue = orders.length
      ? revenue / orders.length
      : 0;

    return {
      revenue,
      deliveredRevenue,
      pendingRevenue,
      averageOrderValue,
      orderCount: orders.length,
    };
  }, [orders]);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">FINANCIAL MANAGEMENT</p>
          <h1>Finance Overview</h1>
          <p>Review order value and payment information for ShopSphere.</p>
        </div>
      </div>

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Total Order Value</span>
          <strong>{formatMoney(stats.revenue)}</strong>
          <small>Across all recorded orders</small>
        </article>

        <article className="admin-stat-card">
          <span>Delivered Order Value</span>
          <strong>{formatMoney(stats.deliveredRevenue)}</strong>
          <small>Orders marked delivered</small>
        </article>

        <article className="admin-stat-card">
          <span>Pending Order Value</span>
          <strong>{formatMoney(stats.pendingRevenue)}</strong>
          <small>Excludes delivered and cancelled orders</small>
        </article>

        <article className="admin-stat-card">
          <span>Average Order Value</span>
          <strong>{formatMoney(stats.averageOrderValue)}</strong>
          <small>{stats.orderCount} recorded orders</small>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Order Finance Records</h2>
          <span>{orders.length} orders</span>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">
            <h3>No financial records yet</h3>
            <p>Order totals will appear here after a customer places an order.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Order Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.date
                        ? new Date(order.date).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td>{order.address?.paymentMethod || "Not recorded"}</td>
                    <td>
                      <span className="admin-status">
                        {order.status || "Placed"}
                      </span>
                    </td>
                    <td>{formatMoney(Number(order.total || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="admin-note">
        Demo report: these figures represent recorded order totals, not verified
        payments, profit, tax, or bank settlements.
      </p>
    </main>
  );
}

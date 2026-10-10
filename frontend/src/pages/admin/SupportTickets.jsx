import { useEffect, useState } from "react";

const STORAGE_KEY = "shopsphere-support-tickets";

const starterTickets = [
  {
    id: "TKT-1001",
    subject: "Where is my order?",
    customer: "Demo Customer",
    category: "Order",
    status: "Open",
    message: "I would like an update on my order.",
  },
];

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? starterTickets;
    } catch {
      return starterTickets;
    }
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  function updateStatus(id, status) {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  }

  function deleteTicket(id) {
    if (!window.confirm("Delete this support ticket?")) return;
    setTickets((previous) => previous.filter((ticket) => ticket.id !== id));
  }

  const filteredTickets =
    filter === "All"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CUSTOMER CARE</p>
          <h1>Support Tickets</h1>
          <p>Review customer issues and update their ticket status.</p>
        </div>
      </div>

      <section className="admin-stat-grid">
        {["Open", "In Progress", "Resolved"].map((status) => (
          <article className="admin-stat-card" key={status}>
            <span>{status} Tickets</span>
            <strong>
              {tickets.filter((ticket) => ticket.status === status).length}
            </strong>
            <small>Current saved tickets</small>
          </article>
        ))}
        <article className="admin-stat-card">
          <span>Total Tickets</span>
          <strong>{tickets.length}</strong>
          <small>All support requests</small>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Customer Requests</h2>
          <select
            aria-label="Filter tickets by status"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {["All", "Open", "In Progress", "Resolved"].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="admin-empty">
            <h3>No tickets found</h3>
            <p>There are no tickets matching this filter.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Customer</th>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.customer}</td>
                    <td>
                      <strong>{ticket.subject}</strong>
                      <br />
                      <small>{ticket.message}</small>
                    </td>
                    <td>{ticket.category}</td>
                    <td>
                      <span className="admin-status">{ticket.status}</span>
                    </td>
                    <td>
                      <div className="admin-action-group">
                        <select
                          aria-label={`Update ${ticket.id} status`}
                          value={ticket.status}
                          onChange={(event) =>
                            updateStatus(ticket.id, event.target.value)
                          }
                        >
                          <option>Open</option>
                          <option>In Progress</option>
                          <option>Resolved</option>
                        </select>
                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() => deleteTicket(ticket.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="admin-note">
        Tickets are currently stored in this browser. A customer-facing ticket
        submission form and backend ticket service can be connected later.
      </p>
    </main>
  );
}

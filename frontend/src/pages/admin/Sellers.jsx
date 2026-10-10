
import { useState } from "react";

function AdminSellers() {
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredSellers = sellers.filter((seller) =>
    `${seller.name} ${seller.email} ${seller.store}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addDemoSeller() {
    const number = Date.now();
    setSellers((current) => [
      {
        id: number,
        name: `Demo Seller ${current.length + 1}`,
        email: `seller${number}@example.com`,
        store: `Shop ${current.length + 1}`,
        status: "Pending",
      },
      ...current,
    ]);
  }

  function updateStatus(id, status) {
    setSellers((current) =>
      current.map((seller) =>
        seller.id === id ? { ...seller, status } : seller
      )
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div>
          <h1>Seller Management</h1>
          <p>Review seller applications and manage store approval.</p>
        </div>
        <button className="primary-button" onClick={addDemoSeller}>
          + Add Demo Application
        </button>
      </div>

      <section className="admin-panel">
        <div className="admin-toolbar">
          <input
            type="search"
            placeholder="Search seller or store..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span>{filteredSellers.length} application(s)</span>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Seller</th>
                <th>Email</th>
                <th>Store Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.store}</td>
                  <td>
                    <span className="admin-status">{seller.status}</span>
                  </td>
                  <td>
                    {seller.status === "Pending" ? (
                      <div className="admin-actions">
                        <button
                          className="table-action"
                          onClick={() => updateStatus(seller.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="table-action delete-action"
                          onClick={() => updateStatus(seller.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>{seller.status}</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredSellers.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-cell">
                    No seller applications yet. Add a demo application to test.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminSellers;
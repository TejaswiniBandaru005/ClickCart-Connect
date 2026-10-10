
import { useState } from "react";

const initialUsers = [];

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );

  function addDemoUser() {
    const number = Date.now();
    setUsers((current) => [
      {
        id: number,
        name: `Demo Customer ${current.length + 1}`,
        email: `customer${number}@example.com`,
        status: "Active",
        role: "Customer",
      },
      ...current,
    ]);
  }

  function toggleStatus(id) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  }

  function deleteUser(id) {
    if (window.confirm("Remove this demo user?")) {
      setUsers((current) => current.filter((user) => user.id !== id));
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div>
          <h1>User Management</h1>
          <p>Review and manage customer accounts.</p>
        </div>
        <button className="primary-button" onClick={addDemoUser}>
          + Add Demo User
        </button>
      </div>

      <section className="admin-panel">
        <div className="admin-toolbar">
          <input
            type="search"
            placeholder="Search name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span>{filteredUsers.length} user(s)</span>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`admin-status ${
                        user.status === "Blocked" ? "status-blocked" : ""
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="table-action"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === "Active" ? "Block" : "Unblock"}
                      </button>
                      <button
                        className="table-action delete-action"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty-cell">
                    No users found. Add a demo user to test the page.
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

export default AdminUsers;
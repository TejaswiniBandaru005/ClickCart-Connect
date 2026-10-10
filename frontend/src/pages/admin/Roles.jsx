import { useEffect, useState } from "react";

const STORAGE_KEY = "shopsphere-demo-roles";

const initialUsers = [
  { id: 1, email: "admin@gmail.com", role: "Admin" },
  { id: 2, email: "seller@gmail.com", role: "Seller" },
  { id: 3, email: "customer@example.com", role: "Customer" },
];

export default function AdminRoles() {
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  function addUser(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) return;

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      setMessage("This email is already in the demo role list.");
      return;
    }

    setUsers((previous) => [
      ...previous,
      { id: Date.now(), email: normalizedEmail, role },
    ]);
    setEmail("");
    setMessage("Demo role entry added.");
  }

  function changeRole(id, newRole) {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    setMessage("Demo role updated.");
  }

  function removeUser(id) {
    const target = users.find((user) => user.id === id);

    if (target?.role === "Admin") {
      setMessage("Admin entries cannot be removed from this demo page.");
      return;
    }

    setUsers((previous) => previous.filter((user) => user.id !== id));
    setMessage("Demo role entry removed.");
  }

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">ACCESS MANAGEMENT</p>
          <h1>Role Management</h1>
          <p>Maintain a demo list of ShopSphere user roles.</p>
        </div>
      </div>

      <section className="admin-panel">
        <h2>Add Role Entry</h2>
        <form className="admin-coupon-form" onSubmit={addUser}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="user@example.com"
              required
            />
          </label>

          <label>
            Role
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option>Customer</option>
              <option>Seller</option>
              <option>Support</option>
              <option>Admin</option>
            </select>
          </label>

          <button type="submit" className="admin-primary-button">
            Add Role
          </button>
        </form>

        {message && <p className="admin-feedback" role="status">{message}</p>}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Users and Roles</h2>
          <span>{users.length} entries</span>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <span className="admin-status">{user.role}</span>
                  </td>
                  <td>
                    <div className="admin-action-group">
                      <select
                        aria-label={`Change role for ${user.email}`}
                        value={user.role}
                        onChange={(event) => changeRole(user.id, event.target.value)}
                      >
                        <option>Customer</option>
                        <option>Seller</option>
                        <option>Support</option>
                        <option>Admin</option>
                      </select>
                      <button
                        type="button"
                        className="table-action delete-action"
                        onClick={() => removeUser(user.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="admin-note">
        Important: these entries do not enforce permissions or change actual
        login access. Production roles must be validated on the Java backend
        with secure authentication and authorization.
      </p>
    </main>
  );
}

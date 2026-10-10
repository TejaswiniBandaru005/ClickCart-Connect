import { useState } from "react";

const STORAGE_KEY = "shopsphere-demo-audit-logs";

function readLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState(readLogs);
  const [message, setMessage] = useState("");

  function addDemoEvent() {
    const newLog = {
      id: Date.now(),
      action: "Demo audit event",
      actor: "admin@gmail.com",
      details: "Manually added from the audit logs page",
      timestamp: new Date().toISOString(),
    };

    const updated = [newLog, ...readLogs()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLogs(updated);
    setMessage("Demo audit event added.");
  }

  function clearLogs() {
    if (!window.confirm("Clear all demo audit logs?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setLogs([]);
    setMessage("Demo logs cleared.");
  }

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">ACTIVITY MONITORING</p>
          <h1>Audit Logs</h1>
          <p>Inspect sample administrative activity records.</p>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Activity History</h2>
          <div className="admin-action-group">
            <button
              type="button"
              className="admin-primary-button"
              onClick={addDemoEvent}
            >
              Add Demo Event
            </button>
            <button
              type="button"
              className="table-action delete-action"
              onClick={clearLogs}
            >
              Clear Logs
            </button>
          </div>
        </div>

        {message && <p className="admin-feedback" role="status">{message}</p>}

        {logs.length === 0 ? (
          <div className="admin-empty">
            <h3>No demo logs yet</h3>
            <p>Add a demo event to see how audit entries are displayed.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString("en-IN")}</td>
                    <td>{log.actor}</td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="admin-note">
        Browser storage is editable by users and is not a secure audit trail.
        Production audit events should be recorded server-side and protected
        against modification.
      </p>
    </main>
  );
}

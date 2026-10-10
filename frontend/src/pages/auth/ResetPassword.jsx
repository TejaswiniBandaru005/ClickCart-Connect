import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Choose a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button className="login-button" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

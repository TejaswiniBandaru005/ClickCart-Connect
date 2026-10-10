import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">
          Enter your email to receive a password reset link.
        </p>

        {sent ? (
          <>
            <p>
              If an account exists for {email}, a reset link would be sent.
              This demo continues on the reset page.
            </p>
            <button
              className="login-button"
              type="button"
              onClick={() => navigate("/reset-password")}
            >
              Continue to Reset Password
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button className="login-button" type="submit">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="register-text">
          Remembered your password?
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

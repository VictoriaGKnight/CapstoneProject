import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmail, loginWithGoogle, signUpEmail } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleEmailLogin() {
    setError("");
    try {
      await loginEmail(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleEmailSignup() {
    setError("");
    try {
      await signUpEmail(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="loginPage">
      <h1 className="pageTitle loginTitle">Log in</h1>

      <div className="card loginCard">
        <div className="formGrid">
          <label className="labelRow">
            <span>Email</span>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="labelRow">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error ? <div className="mutedLabel" style={{ color: "#b00020" }}>{error}</div> : null}

          <div style={{ display: "grid", gap: 10 }}>
            <button className="btn btnPrimary" type="button" onClick={handleEmailLogin}>
              Log in (Email)
            </button>

            <button className="btn btnGhost" type="button" onClick={handleEmailSignup}>
              Sign up (Email)
            </button>

            <button className="btn btnSoft" type="button" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

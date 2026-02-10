import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { loginDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="page">
      <div className="card heroCard">
        <h1 className="h1">Welcome to CraftLedger ✿</h1>
        <p className="muted">Log in to start organizing materials, products, and pricing.</p>

        <div className="formGrid" style={{ marginTop: "1rem" }}>
          <label className="label">
            Email
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="label">
            Password
            <input className="input" type="password" placeholder="••••••••" />
          </label>

          <button
            className="btn btnPrimary"
            onClick={() => {
              loginDemo(email || "demo@craftledger.com");
              navigate("/dashboard");
            }}
          >
            Log in (demo)
          </button>

          <p className="muted" style={{ fontSize: "0.9rem" }}>
            This is a demo login for the skeleton. You’ll replace this with Firebase Auth later.
          </p>
        </div>
      </div>
    </div>
  );
}

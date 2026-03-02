import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { db, auth } from "../services/firebase";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";

export default function ProfilePage() {
  const { user } = useAuth();
  const { products, materials } = useData();

  const [hourlyRate, setHourlyRate] = useState("");
  const [lowThreshold, setLowThreshold] = useState("5");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "settings", "preferences");
    return onSnapshot(ref, (snap) => {
      const data = snap.data();
      if (!data) return;
      if (data.hourlyRate != null) setHourlyRate(String(data.hourlyRate));
      if (data.lowThreshold != null) setLowThreshold(String(data.lowThreshold));
    });
  }, [user]);

  const thresholdNum = Number(lowThreshold || 0);

  const lowProducts = useMemo(() => {
    return (products || [])
      .filter((p) => Number(p.quantity ?? 0) <= thresholdNum)
      .slice(0, 3);
  }, [products, thresholdNum]);

  const lowMaterials = useMemo(() => {
    return (materials || [])
      .filter((m) => Number(m.quantity ?? 0) <= thresholdNum)
      .slice(0, 3);
  }, [materials, thresholdNum]);

  const totalProfitEstimate = useMemo(() => {
    return (products || []).reduce((sum, p) => {
      const price = Number(p.price ?? 0);
      const qty = Number(p.quantity ?? 0);
      return sum + price * qty;
    }, 0);
  }, [products]);

  async function handleUpdateSettings() {
    if (!user) return;
    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid, "settings", "preferences");
      await setDoc(
        ref,
        {
          hourlyRate: Number(hourlyRate || 0),
          lowThreshold: Number(lowThreshold || 0),
          updatedAt: Date.now(),
        },
        { merge: true }
      );
      alert("Settings updated!");
    } catch (e) {
      console.error(e);
      alert("Could not update settings: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    try {
      const newPass = window.prompt("Enter a new password:");
      if (!newPass) return;
      await updatePassword(auth.currentUser, newPass);
      alert("Password updated.");
    } catch (e) {
      alert("Password update failed: " + e.message);
    }
  }

  async function handleChangeEmail() {
    try {
      const newEmail = window.prompt("Enter your new email:");
      if (!newEmail) return;
      await updateEmail(auth.currentUser, newEmail);
      alert("Email updated.");
    } catch (e) {
      alert("Email update failed: " + e.message);
    }
  }

  async function handleDeleteAccount() {
    const ok = window.confirm(
      "Delete your account permanently? This cannot be undone."
    );
    if (!ok) return;

    try {
      await deleteUser(auth.currentUser);
      alert("Account deleted.");
    } catch (e) {
      alert(
        "Delete failed (often requires recent login). Try logging out/in and then delete again.\n\n" +
          e.message
      );
    }
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Profile</h1>

      <section className="profileLayout">
       
        <aside className="card profileSidebar">
          <div className="profileUserBlock">
            <div className="profileUsername">
              {user?.displayName || user?.email || "Username"}
            </div>
            <div className="mutedLabel">{user?.email}</div>
          </div>

          <div className="profileMenu">
            <button className="profileMenuItem" type="button">
              Profile <span aria-hidden="true">›</span>
            </button>
            <button className="profileMenuItem" type="button" onClick={handleChangePassword}>
              Change Password <span aria-hidden="true">›</span>
            </button>
            <button className="profileMenuItem" type="button" onClick={handleChangeEmail}>
              Change Email <span aria-hidden="true">›</span>
            </button>
            <button className="profileMenuItem danger" type="button" onClick={handleDeleteAccount}>
              Delete Account <span aria-hidden="true">›</span>
            </button>
            <button className="profileMenuItem" type="button" onClick={handleLogout}>
              Logout <span aria-hidden="true">›</span>
            </button>
          </div>
        </aside>

        <div className="profileMain">
        
          <div className="card profileStats">
            <div className="profileStatBox">
              <div className="mutedLabel">Total Profit</div>
              <div className="profileMoney">${totalProfitEstimate.toFixed(2)}</div>
              <div className="mutedLabel" style={{ fontSize: 12 }}>
                estimate (price × quantity)
              </div>
            </div>

            <div className="profileListBox">
              <div className="mutedLabel">Low Products</div>
              <ol className="profileMiniList">
                {lowProducts.length ? (
                  lowProducts.map((p) => (
                    <li key={p.id}>{p.name || "Unnamed"}</li>
                  ))
                ) : (
                  <li className="mutedLabel">None</li>
                )}
              </ol>
            </div>

            <div className="profileListBox">
              <div className="mutedLabel">Low Materials</div>
              <ol className="profileMiniList">
                {lowMaterials.length ? (
                  lowMaterials.map((m) => (
                    <li key={m.id}>{m.name || "Unnamed"}</li>
                  ))
                ) : (
                  <li className="mutedLabel">None</li>
                )}
              </ol>
            </div>
          </div>

          <div className="card profileSettings">
            <div className="profileSettingsRow">
              <div className="profileSettingsFields">
                <label className="profileSettingLine">
                  <span>Set hourly rate:</span>
                  <input
                    className="input"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="e.g. 15"
                  />
                </label>

                <label className="profileSettingLine">
                  <span>Set low alert threshold:</span>
                  <input
                    className="input"
                    value={lowThreshold}
                    onChange={(e) => setLowThreshold(e.target.value)}
                    placeholder="e.g. 5"
                  />
                </label>
              </div>

              <button
                className="btn btnPrimary"
                type="button"
                onClick={handleUpdateSettings}
                disabled={saving}
              >
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
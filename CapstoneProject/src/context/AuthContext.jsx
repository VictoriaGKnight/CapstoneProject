import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Skeleton only: using a fake “logged in” state via localStorage
  // Later, replace with Firebase auth and onAuthStateChanged.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("demoUser");
    setUser(saved ? JSON.parse(saved) : null);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginDemo: (email) => {
        const demo = { id: "demo-user", email };
        localStorage.setItem("demoUser", JSON.stringify(demo));
        setUser(demo);
      },
      logoutDemo: () => {
        localStorage.removeItem("demoUser");
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

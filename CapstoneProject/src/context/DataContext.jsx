import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext.jsx";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [profileSettings, setProfileSettings] = useState({
    hourlyRate: 0,
    lowThreshold: 5,
  });

  useEffect(() => {
    if (!user) {
      setProducts([]);
      setMaterials([]);
      setProfileSettings({ hourlyRate: 0, lowThreshold: 5 });
      return;
    }

    const productsRef = collection(db, "users", user.uid, "products");
    const productsQ = query(productsRef, orderBy("createdAt", "desc"));
    const unsubProducts = onSnapshot(productsQ, (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const materialsRef = collection(db, "users", user.uid, "materials");
    const materialsQ = query(materialsRef, orderBy("createdAt", "desc"));
    const unsubMaterials = onSnapshot(materialsQ, (snap) => {
      setMaterials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const settingsRef = collection(db, "users", user.uid, "settings");
    const settingsQ = query(settingsRef);
    const unsubSettings = onSnapshot(settingsQ, (snap) => {
      const first = snap.docs[0]?.data();
      if (first) {
        setProfileSettings({
          hourlyRate: Number(first.hourlyRate || 0),
          lowThreshold: Number(first.lowThreshold || 5),
        });
      }
    });

    return () => {
      unsubProducts();
      unsubMaterials();
      unsubSettings();
    };
  }, [user]);

  const value = useMemo(
    () => ({
      products,
      materials,
      profileSettings,
    }),
    [products, materials, profileSettings]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext.jsx";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (!user) {
      setProducts([]);
      setMaterials([]);
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

    return () => {
      unsubProducts();
      unsubMaterials();
    };
  }, [user]);

  const value = useMemo(
    () => ({ products, setProducts, materials, setMaterials }),
    [products, materials]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
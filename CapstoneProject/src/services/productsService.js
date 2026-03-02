import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function addProduct(uid, product) {
  const ref = collection(db, "users", uid, "products");
  return addDoc(ref, { ...product, createdAt: serverTimestamp() });
}

export async function updateProduct(uid, productId, patch) {
  const ref = doc(db, "users", uid, "products", productId);
  return updateDoc(ref, patch);
}

export async function deleteProduct(uid, productId) {
  const ref = doc(db, "users", uid, "products", productId);
  return deleteDoc(ref);
}
/*
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addMaterial(uid, material) {
  const ref = collection(db, "users", uid, "materials");
  return addDoc(ref, { ...material, createdAt: serverTimestamp() });
}

export async function updateMaterial(uid, materialId, patch) {
  const ref = doc(db, "users", uid, "materials", materialId);
  return updateDoc(ref, patch);
}

export async function deleteMaterial(uid, materialId) {
  const ref = doc(db, "users", uid, "materials", materialId);
  return deleteDoc(ref);
}
*/

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addMaterial(uid, material) {
  const ref = collection(db, "users", uid, "materials");
  return addDoc(ref, { ...material, createdAt: serverTimestamp() });
}

export async function updateMaterial(uid, materialId, patch) {
  const ref = doc(db, "users", uid, "materials", materialId);
  return updateDoc(ref, patch);
}

export async function deleteMaterial(uid, materialId) {
  const ref = doc(db, "users", uid, "materials", materialId);
  return deleteDoc(ref);
}
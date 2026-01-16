import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];      
  technologies: string[];     
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type ExperiencePayload = Omit<
  Experience,
  "id" | "createdAt" | "updatedAt"
>;


export async function getExperience(): Promise<Experience[]> {
  const q = query(
    collection(db, "experiences"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Experience, "id">),
  }));
}


export async function addExperience(
  data: ExperiencePayload
): Promise<string> {
  const ref = await addDoc(collection(db, "experiences"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}


export async function updateExperience(
  id: string,
  data: Partial<ExperiencePayload>
): Promise<void> {
  await updateDoc(doc(db, "experiences", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}


export async function deleteExperience(id: string): Promise<void> {
  await deleteDoc(doc(db, "experiences", id));
}

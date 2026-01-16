import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  country: string;
  date: string;
  GPA_dec: string;
  GPA: string;
  description: string;
  skills: string[];
  icon: "graduation" | "code";
  createdAt?: unknown;
  updatedAt?: unknown;
};
export type EducationPayload = Omit<Education, "id" | "createdAt" | "updatedAt">;


export async function getEducations(): Promise<Education[]> {
  const q = query(
    collection(db, "educations"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Education, "id">),
  }));
}


export async function addEducation(
  data: EducationPayload
): Promise<string> {
  const ref = await addDoc(collection(db, "educations"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}

export async function updateEducation(
  id: string,
  data: Partial<EducationPayload>
): Promise<void> {
  await updateDoc(doc(db, "educations", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteEducation(id: string): Promise<void> {
  await deleteDoc(doc(db, "educations", id));
}

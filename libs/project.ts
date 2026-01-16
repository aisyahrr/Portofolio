import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export type TProject = {
  id: string;
  image: string;
  project: string;
  role: string;
  deskripsi: string;
  year: string;
  github: string;
  view: string;
  tools: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  isPinned?: boolean; 
};

export type ProjectPayload = Omit<
  TProject,
  "id" | "createdAt" | "updatedAt"
>;

export async function getProject(): Promise<TProject[]> {
  const q = query(
    collection(db, "projects"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<TProject, "id">),
  }));
}


export async function addProject(
  data: ProjectPayload
): Promise<string> {
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    isPinned: false,
    createdAt: serverTimestamp(),
  });

  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<ProjectPayload>
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

export async function togglePinProject(
  id: string,
  isPinned: boolean
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    isPinned,
    updatedAt: serverTimestamp(),
  });
}



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

export type CertificateType =
    | "course"
    | "certification"
    | "bootcamp"
    | "competition"
    | "workshop"
    | "ShortClass";

export type TCertificate = {
    id: string;
    title: string;
    issuer: string; 
    image: string;
    credentialUrl?: string;
    type: CertificateType;
    issuedAt: string; 
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    isPinned?: boolean;
};

export type CertificatePayload = Omit<
    TCertificate,
    "id" | "createdAt" | "updatedAt"
>;

export async function getCertificates(): Promise<TCertificate[]> {
    const q = query(
        collection(db, "certificates"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TCertificate, "id">),
    }));
}

export async function addCertificate(
    data: CertificatePayload
): Promise<string> {
    const ref = await addDoc(collection(db, "certificates"), {
        ...data,
        isPinned: false,
        createdAt: serverTimestamp(),
    });

    return ref.id;
}

export async function updateCertificate(
    id: string,
    data: Partial<CertificatePayload>
): Promise<void> {
    await updateDoc(doc(db, "certificates", id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteCertificate(id: string): Promise<void> {
    await deleteDoc(doc(db, "certificates", id));
}




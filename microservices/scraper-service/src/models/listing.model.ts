import { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";
import { initFirestore, Timestamp, QueryDocumentSnapshot } from "../../../shared/src/config";
import { Listing } from "../types";

const databaseURL = process.env.FIREBASE_DATABASE_URL;
const firestore = initFirestore(serviceAccount as ServiceAccount, databaseURL as string);

const collection = () => firestore.collection("listings");

export const ListingModel = {
  collection,

  doc: (id: string) => collection().doc(id),

  async get(id: string): Promise<Listing | null> {
    const snap = await this.doc(id).get();
    return snap.exists ? (snap.data() as Listing) : null;
  },

  async create(data: Omit<Listing, "createdAt" | "updatedAt">): Promise<void> {
    const now = Timestamp.now();
    const listing: Listing = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    await this.doc(data.id).set(listing);
  },

  async list(limit = 20): Promise<Listing[]> {
    const snap = await collection().orderBy("createdAt", "desc").limit(limit).get();

    return snap.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Listing);
  },
};

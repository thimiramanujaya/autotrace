import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';
import { initFirestore, Timestamp, QueryDocumentSnapshot } from '../../../shared/src/config';
import { User } from '../types';

const databaseURL = process.env.FIREBASE_DATABASE_URL;
const firestore = initFirestore(serviceAccount as ServiceAccount, databaseURL as string);

const collection = () => firestore.collection('users');

export const UserModel = {
  collection,

  doc: (id: string) => collection().doc(id),

  async get(id: string): Promise<User | null> {
    const snap = await this.doc(id).get();
    return snap.exists ? (snap.data() as User) : null;
  },

  async getExistingUser(username: string, email: string, phone: string): Promise<User | null> {
    const snap = await collection().where('username', '==', username).where('email', '==', email).where('phone', '==', phone).get();
    return snap.empty ? null : (snap.docs[0].data() as User);
  },

  async create(data: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> {
    const now = Timestamp.now();
    await this.doc(data.id).set({ ...data, createdAt: now, updatedAt: now });
  },

  async update(id: string, data: Partial<User>): Promise<void> {
    await this.doc(id).update({ ...data, updatedAt: Timestamp.now() });
  },

  async delete(id: string): Promise<void> {
    await this.doc(id).delete();
  },

  async getAll(): Promise<User[]> {
    const snapshot = await collection().get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as User);
  }
};


import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Timestamp, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export function initFirestore(serviceAccount: ServiceAccount, databaseURL: string) {
  const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL
  });

  return getFirestore(app);
}

export { Timestamp, QueryDocumentSnapshot };
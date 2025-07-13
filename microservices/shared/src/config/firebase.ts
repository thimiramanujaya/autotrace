import admin, { ServiceAccount } from 'firebase-admin';

export function initFirestore(serviceAccount: ServiceAccount, databaseURL: string) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL,
    });
  }
  const firestore = admin.firestore();
  return firestore;
}

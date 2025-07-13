import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccountJson from "../../serviceAccountKey.json";

const serviceAccount = serviceAccountJson as ServiceAccount;


const databaseURL = process.env.FIREBASE_DATABASE_URL;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
  });
}

export const firestore = admin.firestore();

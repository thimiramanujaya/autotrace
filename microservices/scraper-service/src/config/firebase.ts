import admin from 'firebase-admin';

const databaseURL = process.env.FIREBASE_DATABASE_URL;

if (!admin.apps.length) {
  admin.initializeApp({
    databaseURL: databaseURL,
  });
}

export const firestore = admin.firestore();

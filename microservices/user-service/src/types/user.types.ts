import { Timestamp } from 'firebase-admin/firestore';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  phone: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
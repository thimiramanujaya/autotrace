import { Timestamp } from "firebase-admin/firestore";

export interface Listing {
  id: string;
  vin: string;
  title: string;
  mileage: number;
  price: number;
  description?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

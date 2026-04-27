import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface Transaction {
  memberId: string;
  memberName: string;
  type: 'contribution' | 'emi' | 'loan' | 'penalty' | 'manual_interest';
  amount: number;
  date: string;
  description?: string;
  referenceId?: string;
}

export async function addTransaction(data: Transaction): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, "transactions"), data);
    console.log("Transaction added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding transaction: ", e);
    throw e;
  }
}

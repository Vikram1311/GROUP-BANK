import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Transaction } from "../types";

function isTransaction(data: unknown): data is Omit<Transaction, 'id'> {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.amount === 'number' &&
    typeof d.date === 'string' &&
    (d.type === 'contribution' || d.type === 'emi' || d.type === 'loan' || d.type === 'other')
  );
}

export function listenTransactions(callback: (transactions: Transaction[]) => void): () => void {
  return onSnapshot(collection(db, "transactions"), (snapshot) => {
    const list: Transaction[] = snapshot.docs.reduce<Transaction[]>((acc, doc) => {
      const data = doc.data();
      if (isTransaction(data)) {
        acc.push({ id: doc.id, ...data });
      }
      return acc;
    }, []);
    callback(list);
  });
}

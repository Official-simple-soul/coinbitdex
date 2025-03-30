import axios from 'axios';
import type { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '~/config/firebase';
import type { UserData } from '~/providers/types';

export async function fetchMarketData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
    );
    const data = await response.json();
    const tether_image = data.find((e: any) => e.symbol === 'usdt').image;

    const array = data
      ?.filter((e: any) => e.name !== 'Tether')
      ?.map((e: any) => {
        return {
          name: e.name,
          symbol: e.symbol,
          price: e.current_price,
          change: e.price_change_percentage_24h,
          image: e.image,
          tether_image,
        };
      });

    return array;
  } catch (error) {
    console.error(error);
  }
}

export const listRecords = async (uid: string) => {
  try {
    const userRecordsCollection = collection(db, 'users', uid, 'userRecords');
    const q = query(userRecordsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const records = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return records;
  } catch (error) {
    console.error('Error retrieving user records:', error);
    throw error;
  }
};

export async function fetchUsers(): Promise<User[]> {
  const q = query(collection(db, 'users'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Partial<User>),
  })) as User[];
}

export const fetchUser = async (uid: string): Promise<UserData | null> => {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists()
    ? {
        id: docSnap.id,
        ...(docSnap.data() as UserData),
      }
    : null;
};

export const fetchKYC = async (uid: string) => {
  const kycCollectionRef = collection(db, 'users', uid, 'kyc');
  const q = query(kycCollectionRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchDeposits = async (uid: string) => {
  const depositsCollectionRef = collection(db, 'users', uid, 'userDeposits');
  const q = query(depositsCollectionRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchTransactions = async (uid: string) => {
  const recordsCollectionRef = collection(db, 'users', uid, 'userRecords');
  const q = query(recordsCollectionRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

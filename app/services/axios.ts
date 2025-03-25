import axios from 'axios';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '~/config/firebase';

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

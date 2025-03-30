import { createContext, useContext, useState } from 'react';
import { db } from '~/config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { DepositData, KYCData, MailData, RecordData } from './types';

export interface FunctionsContextInterface {
  loading: boolean;
  storeDeposit: (uid: string, depositData: DepositData) => Promise<void>;
  storeRecord: (uid: string, recordData: RecordData) => Promise<void>;
  storeKYC: (uid: string, KycData: KYCData) => Promise<void>;
  sendMail: (mailData: MailData) => Promise<void>;
}

const FunctionsContext = createContext<FunctionsContextInterface | null>(null);

export const FunctionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);

  const storeDeposit = async (uid: string, depositData: DepositData) => {
    setLoading(true);
    try {
      const userDepositsCollection = collection(
        db,
        'users',
        uid,
        'userDeposits'
      );
      await addDoc(userDepositsCollection, {
        ...depositData,
        status: 'pending',
        type: 'deposit',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error storing deposit:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const storeRecord = async (uid: string, recordData: RecordData) => {
    setLoading(true);
    try {
      const userRecordsCollection = collection(db, 'users', uid, 'userRecords');
      await addDoc(userRecordsCollection, {
        ...recordData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error storing user record:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const storeKYC = async (uid: string, kycData: KYCData) => {
    setLoading(true);
    try {
      const userKycCollection = collection(db, 'users', uid, 'kyc');
      await addDoc(userKycCollection, {
        ...kycData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error storing user kyc:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendMail = async (mailData: MailData) => {
    const data = {
      service_id: 'service_k98a6fk',
      template_id: 'template_h9y548t',
      user_id: 'l1SMwkup0_5uqyGfU',
      template_params: {
        email: mailData.email,
        message: mailData.message,
      },
    };

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <FunctionsContext.Provider
      value={{ loading, storeDeposit, storeRecord, storeKYC, sendMail }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};

export const useFunctions = () => {
  const context = useContext(FunctionsContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

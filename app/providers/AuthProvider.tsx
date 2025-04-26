import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { auth, db } from '~/config/firebase';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import type { UserData } from './types';

export interface AuthContextInterface {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<User>;
  storeUser: (user: UserData) => Promise<void>;
  updateUser: (uid: string, userData: Partial<UserData>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const unsubscribeFirestore = fetchUserData(firebaseUser.uid, setUser);
        return () => {
          unsubscribeFirestore();
        };
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (
    uid: string,
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>
  ) => {
    const userRef = doc(db, 'users', uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data() as UserData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const storeUser = async (userData: UserData) => {
    try {
      const userRef = doc(db, 'users', userData.uid);
      await setDoc(userRef, {
        ...userData,
        balance: 0,
        copy_trading_balance: 0,
        referral_id: `${userData.firstName}_${userData.phone}`,
        kyc_status: '',
        kyc_level: 1,
        referral_earn: 0,
        total_deposit: 0,
        role: 'user',
        total_withdraw: 0,
        copy_trading_profit: 0,
        total_profit: 0,
        minimum_deposit: 100,
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  };

  const updateUser = async (uid: string, userData: Partial<UserData>) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  // const sendEmailVerification = async () => {
  //   try {
  //     await sendEmailVerification(auth.currentUser)
  //   } catch (error) {
  //     console.error('Error sending email verification:', error);
  //     throw error;
  //   }
  // }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, storeUser, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

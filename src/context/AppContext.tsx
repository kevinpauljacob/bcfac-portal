import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface UserData {
  email: string;
  name: string;
  registrationNumber: string;
  role: string;
}

interface AppContextType extends UserData {
  // user: UserData | null;
}

export const AppContext = createContext<AppContextType | null>(null);
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "users", uid);

        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data() as UserData;
              setUser(userData);
            } else {
              console.error('User data not found');
              setUser(null);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={user}>
      {children}
    </AppContext.Provider>
  );
  
};

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase'; 
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const WithAdminAuth = (props: any) => { 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        if (!auth.currentUser) {
          console.log("You should be logged in as admin to access this page.");
          router.push('/login');
        } else {
          const uid = auth.currentUser.uid;
          const userDocRef = doc(db, "users", uid);
    
          getDoc(userDocRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                if (userData.role === "admin") {
                  console.log("Current user is an admin.");
                } else {
                  console.log("Current user is not an admin.");
                  router.push("/dashboard");
                }
              } else {
                console.log("No matching user document found.");
              }
            })
            .catch((error) => {
              console.error("Error querying Firestore:", error);
            });
    
          setIsLoading(false);
        }
      });
    
      return () => {
        unsubscribe();
      };
    }, [router]);

    if (isLoading) {
      return (
        <div className="">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminAuth;
};

export default withAdminAuth;

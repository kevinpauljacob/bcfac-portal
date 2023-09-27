import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => { 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          console.log("You should be logged in to access this page.");
          router.push('/login');
        } else {
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

  return WithAuth;
};

export default withAuth;

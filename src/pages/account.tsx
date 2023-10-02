import React, { useContext } from 'react';
import withAuth from '@/utils/withAuth';
import { AppContext } from '@/context/AppContext';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const router = useRouter();
  const user = useContext(AppContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User has been logged out.");
        // Show success toast notification
        toast.success('Logout successful!');
        router.push('/login');
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        // Show error toast notification
        toast.error('Error during logout. Please try again.');
      });
  };

  return (
    <div className="">
      <p className="text-xl font-semibold py-5">Account Settings</p>
      {user && 
        <>
          <div className="flex py-1">
            <label htmlFor="email" className="font-semibold">Email:&nbsp;</label>
            <p>{user.email}</p>
          </div>
          <div className="flex py-1">
            <label htmlFor="name" className="font-semibold">Name:&nbsp;</label>
            <p>{user.name}</p>
          </div>
          <div className="flex py-1">
            <label htmlFor="regno" className="font-semibold">Registration Number:&nbsp;</label>
            <p>{user.registrationNumber}</p>
          </div>
          {/* <form onSubmit={submit}>
            <div className="flex py-1">
              <label htmlFor="passwordChange" className="font-semibold">Change Password:&nbsp;</label>
              <input
                type="password"
                id="passwordChange"
                name="passwordChange"
                className="border-2 rounded-sm"
              />
            </div>
            <br />
            <button type="submit" className="border p-2 rounded-md">Save Changes</button>
          </form> */}
          <button onClick={handleLogout} className='bg-red-300 rounded-md px-3 py-2 hover:bg-red-400 transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300'>Logout</button>
        </>
      }
      {!user && 
        <>
          Loading...
        </>
      }
    </div>
  );
};

export default withAuth(Account);

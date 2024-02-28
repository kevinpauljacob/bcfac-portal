import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

{
  /* <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/> */
}

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", auth.currentUser?.uid || "");
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData?.role;

        // Route based on user role
        if (userRole === "admin") {
          router.push("/admin"); // Route to the admin page
        } else {
          router.push("/dashboard"); // Route to the student page
        }
      } else {
        toast.error("User not found! Please Register first...");
      }

      // console.log("Login successful!");
      setEmail("");
      setPassword("");

      // success toast notification
      toast.success("Login successful!");
    } catch (error) {
      setEmail("");
      setPassword("");
      console.error("Login error: ", error);

      // error toast notification
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-semibold pt-3">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="w-[300px] mt-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold my-2">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold my-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <button
          type="submit"
          className="text-md font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-1.5 w-[300px] mt-3"
        >
          Login
        </button>
      </form>
      <Link href="/register">
        <p className="text-sm font-semibold text-center mt-5">
          Don&apos;t have an account?{" "}
          <span className="underline">Register</span>
        </p>
      </Link>

      {/* React-toastify container for displaying notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    password: "",
  });

  const { name, email, registrationNumber, password } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log(formValues);
  }, [formValues]);

  const isValidEmail = () => {
    const emailPattern = /^[A-Za-z]{2}\d{4}@srmist\.edu\.in$/;
    return emailPattern.test(email);
  };

  const isValidRegistrationNumber = () => {
    const registrationNumberPattern = /^RA\d{13}$/;
    return registrationNumberPattern.test(registrationNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail() && isValidRegistrationNumber()) {
      try {
        const newUser = {
          name,
          email,
          registrationNumber,
          role: "student",
        };

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const { uid } = userCredential.user;

        await setDoc(doc(db, "users", uid), {
          ...newUser,
        });

        // console.log("User registered with ID: ", uid);

        setFormValues({
          name: "",
          email: "",
          registrationNumber: "",
          password: "",
        });

        // Show success toast notification
        toast.success("Registration successful!");

        router.push("/dashboard");
      } catch (error) {
        console.error("Error registering user: ", error);

        // Show error toast notification
        toast.error("Registration failed. Please try again.");

        setFormValues({
          name: "",
          email: "",
          registrationNumber: "",
          password: "",
        });
      }
    } else {
      console.error(
        "Email or Registration Number does not match the required pattern."
      );
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-semibold pt-3">Welcome!</h2>
      <form onSubmit={handleSubmit} className="w-[300px] mt-5">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold my-1">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold my-2">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="registrationNumber"
            className="text-sm font-semibold my-2"
          >
            Registration Number:
          </label>
          <input
            type="text"
            placeholder="Enter your registration number"
            id="registrationNumber"
            name="registrationNumber"
            value={registrationNumber}
            onChange={handleChange}
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
            name="password"
            value={password}
            onChange={handleChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <button
          type="submit"
          className="text-md font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-1.5 w-[300px] mt-3"
        >
          Register
        </button>
        <Link href="/login">
          <p className="text-sm font-semibold text-center mt-5">
            Already have an account? <span className="underline">Login</span>
          </p>
        </Link>
      </form>

      {/* React-toastify container for displaying notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Register;

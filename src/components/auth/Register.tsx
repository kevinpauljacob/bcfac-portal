import React, { useState } from "react";
import Link from 'next/link'

const Register = () => {

    type FormValues = {
        name: string;
        email: string;
        registrationNumber: string;
        password: string;
      }
      

    const [formValues, setFormValues] = useState<FormValues>({
        name: "",
        email: "",
        registrationNumber: "",
        password: "",
    });
    
    const {name, email, registrationNumber, password} = formValues;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform login logic here using email and password
        console.log("Login submitted!");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
        <h2 className="text-2xl font-semibold">Welcome!</h2>
        <form onSubmit={handleSubmit} className="w-[300px] mt-5">
            <div className="flex flex-col">
            <label htmlFor="Name" className="text-sm font-semibold my-2">Name:</label>
            <input
                type="Name"
                placeholder="Enter your name"
                id="Name"
                value={name}
                onChange={handleChange}
                className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold my-2">Email:</label>
            <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={handleChange}
                className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="registrationNumber" className="text-sm font-semibold my-2">Registration Number:</label>
            <input
                type="registrationNumber"
                placeholder="Enter your registration number"
                id="username"
                value={registrationNumber}
                onChange={handleChange}
                className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold my-2">Password:</label>
            <input
                type="password"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={handleChange}
                className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
            />
            </div>
            <button type="submit" className="text-md font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-1.5 w-[300px] mt-3">
                Register
            </button>
            <Link href="/login">
                <p className="text-sm font-semibold text-center mt-5">Already have an account? <span className="underline">Login</span></p>
            </Link>
        </form>
        </div>
    );
};

export default Register;


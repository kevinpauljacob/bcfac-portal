import React, { useState } from "react";
import { PiArrowBendDoubleUpRightDuotone } from 'react-icons/pi'

interface RegisterProps {
    showRegister: boolean;
    setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const Register: React.FC<RegisterProps> = ({ showRegister, setShowRegister }) => {

    const handleCloseRegister = () => {
        setShowRegister(false);
    }

    type FormValues = {
        firstName: string;
        lastName: string;
        email: string;
        userName: string;
        password: string;
      }
      

    const [formValues, setFormValues] = useState<FormValues>({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });
    
    const {firstName, lastName, email, userName, password} = formValues;
    
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
            <label htmlFor="firstName" className="text-sm font-semibold my-2">First Name:</label>
            <input
                type="firstName"
                placeholder="Enter your first name"
                id="firstName"
                value={firstName}
                onChange={handleChange}
                className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-semibold my-2">Last Name:</label>
            <input
                type="lastName"
                placeholder="Enter your last name"
                id="firstName"
                value={lastName}
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
            <label htmlFor="username" className="text-sm font-semibold my-2">Username:</label>
            <input
                type="username"
                placeholder="Enter your username"
                id="username"
                value={userName}
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
            <p className="text-sm font-semibold text-center mt-5">Already have an account? <span className="underline">Login</span></p>
        </form>
        <button onClick={handleCloseRegister} className="fixed top-5 right-5 text-3xl">
            <PiArrowBendDoubleUpRightDuotone/>
        </button>
        </div>
    );
};

export default Register;


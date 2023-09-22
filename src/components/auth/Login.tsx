import React, { useState } from "react";
import { PiArrowBendDoubleUpRightDuotone } from 'react-icons/pi'

interface LoginProps {
    showLogin: boolean;
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Login: React.FC<LoginProps> = ({ showLogin, setShowLogin }) => {

    const handleCloseLogin = () => {
        setShowLogin(false);
    }
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here using email and password
    console.log("Login submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-semibold">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="w-[300px] mt-5">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-semibold my-2">Username:</label>
          <input
            type="username"
            placeholder="Enter your username"
            id="username"
            value={userName}
            onChange={handleUserNameChange}
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
            onChange={handlePasswordChange}
            className="text-sm border-2 border-black rounded-md focus:outline-none focus:bg-black/10 transition ease-in-out duration-500 p-2"
          />
        </div>
        <button type="submit" className="text-md font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-1.5 w-[300px] mt-3">
            Login
        </button>
        <p className="text-sm font-semibold text-center mt-5">Don&apos;t have an account? <span className="underline">Register</span></p>
      </form>
      <button onClick={handleCloseLogin} className="fixed top-5 right-5 text-3xl">
        <PiArrowBendDoubleUpRightDuotone/>
      </button>
    </div>
  );
};

export default Login;
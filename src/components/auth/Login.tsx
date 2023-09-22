import React, { useState } from "react";
import Link from 'next/link'
  
  const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-semibold">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="w-[300px] mt-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold my-2">Email:</label>
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
        <Link href="/register"> 
          <p className="text-sm font-semibold text-center mt-5">Don&apos;t have an account? <span className="underline">Register</span></p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
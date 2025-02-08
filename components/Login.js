"use client";

import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/app/context/AuthContext";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState("");

  const { signup, login } = useAuth();

  async function handleSubmit() {
    setError("")
    if (!email || !password) {
      setError("All fields must be filled");
      return
    }
    else if ( password.length < 6){
      setError("Password must be at least 6 characters");
      return
    }

    setAuthenticating(true)
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message)
      console.error(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You are one step away!</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={"max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none " + (email === "" && error ? "border-red-600 " : "border-indigo-400 ")}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={"max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid  rounded-full outline-none " + ((password === "" || password.length < 6) && error ? "border-red-600 " : "border-indigo-400 ")}
        placeholder="Password"
        type="password"
      />
      {error && <p className="text-red-600 text-md font-bold">{error}</p>}
      <div className="max-w-[400px] w-full mx-auto">
        <Button handleClick={handleSubmit} text={authenticating ? "Submitting": "Submit"} full />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

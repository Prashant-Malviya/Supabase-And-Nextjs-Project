'use client'

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const login = async () => {
    setError(""); // Reset error before new request

    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error; // If there's an error, handle it

      if (session) {
        console.log("User Logged In:", session);
        router.push("/"); // Redirect to home page after login
      }
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto w-[400px] flex flex-col justify-center items-center content-center my-auto space-y-4 relative top-44">
      
      <h1 className="font-bold text-2xl">Login Here</h1>
      
      <div className="grid">
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          name="email"
          value={data.email} 
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 p-2 rounded-md text-gray-900"
          required
        />
      </div>

      <div className="grid">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 p-2 rounded-md text-gray-900"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>} 

      <div>
        <p>Don't Have An Account?  
          <a href="/signup" className="underline text-blue-400"> Signup here</a> 
        </p>
      </div>

      <div>
        <button 
          className="my-4 px-5 py-3 text-white bg-amber-600 rounded-2xl cursor-pointer" 
          onClick={login}
        >
          Login
        </button>
      </div>
      
    </div>
  );
};

export default Login;

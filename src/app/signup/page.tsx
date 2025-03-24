"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const signup = async () => {
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email: data.email, // Use user input
        password: data.password,
      });

      if (error) {
        console.error("Signup error:", error.message);
        return;
      }

      console.log("Signup success:", user);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto w-[400px] flex flex-col justify-center items-center space-y-4 relative top-44">
      <h1 className="font-bold text-2xl">Signup Here</h1>

      <div className="grid">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
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
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 p-2 rounded-md text-gray-900"
          required
        />
      </div>

      <div>
        <button
          className="my-4 px-5 py-3 text-white bg-amber-600 rounded-2xl cursor-pointer"
          onClick={signup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;

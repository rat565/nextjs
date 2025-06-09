"use client";
import React, { use,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(true);
  
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/login", formData);
      console.log("Response from login:", res.data);
      router.push("/profile");
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonText(false);
    } else {
      setButtonText(true);
    }
  }, [formData]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <input
        type="email"
        id="email"
        className="border-2 border-gray-300 rounded-md p-2 m-2"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
      />
      <input
        type="password"
        id="password"
        className="border-2 border-gray-300 rounded-md p-2 m-2"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter your password"
      />
      <button
        className="bg-green-500 text-white rounded-md p-2 m-2"
        onClick={onSubmit}
      >
        {buttonText ? "Login" : "..."}
      </button>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Not have an account? signup
      </Link>
    </div>
  );
}

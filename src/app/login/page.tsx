"use client";
import React, { use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const onSubmit = async () => {};
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
        LogIn
      </button>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Not have an account? signup
      </Link>
    </div>
  );
}

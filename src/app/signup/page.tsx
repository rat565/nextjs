"use client";
import React, { use, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { set } from 'mongoose';
export  default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [ButttonText, setButtonText] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSubmit = async () => {
      try{
        setLoading(true);
        const res =await axios.post('/api/user/signup', formData)
        console.log("Response from signup:", res.data);
        router.push('/login');
        toast.success("Signup successful! Please login.");
      }
      catch (error:any) {
        console.error("Error during signup:", error);
        toast.error(error.message || "An error occurred during signup");
      }
      finally{
        setLoading(false);
      }
    };
    useEffect(()=>{
  if(formData.email.length >0 && formData.password.length > 0 && formData.username.length > 0 && formData.confirmPassword.length > 0) {
        setButtonText(false);
      }
      else {
        setButtonText(true)
      }
    },[formData])
    return (
      
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1>{loading ? "loading":"signup"}</h1>
        <input
          type="text"
          id="username"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder='Enter your username'
        />
        <input
          type="email"
          id="email"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder='Enter your email'
        />
        <input
          type="password"
          id="password"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder='Enter your password'
        />
        <input
          type="password"
          id="confirmPassword"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder='Confirm your password'
        />
        <button
          className="bg-green-500 text-white rounded-md p-2 m-2"
          onClick={onSubmit}
        >
          {ButttonText ? "No" : "SignUp"}
        </button>
        <Link href="/login" className="text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    );
}
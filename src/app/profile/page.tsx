"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProfilePage() {
    const router = useRouter();
    const logout = async() => {
        try{
            await axios.get('/api/user/logout');
            toast.success("Logout successful! Please login.");
            router.push('/login');
        }
        catch(error:any){
            console.log(error);
            toast.error(error.message || "An error occurred during logout");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1>Profile</h1>
            <button onClick={() => logout()} >Logout</button>
        </div>
    );
}
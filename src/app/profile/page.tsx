"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")


    const getUserDetails = async() => {

        try {

            const response = await axios.post("/api/users/me")      // we could also have done a get request because originally it is a get request.
            console.log(response.data.data._id);
            setData(response.data.data._id)
            
        } catch (error : any) {
            console.log(error);
            toast.error(error.message)
        }

    }


    const logout = async() => {

        try {

            const response = await axios.get("api/users/logout")
            toast.success("Logout success!")
            router.push("/login")

        } catch (error : any) {
            console.log(error);
            toast.error(error.message)
        }

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />

            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>

        </div>
    )
}
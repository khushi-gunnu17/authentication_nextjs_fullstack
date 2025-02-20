"use client"    // directive which makes this page a client component
import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    // router comes from two places : router and navigation
    const router = useRouter()

    const [user, setUser] = useState({
        email : "",
        password : ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)


    const onLogin = async() => {

        try {

            setLoading(true)

            // axios is much preferred because it handles some error states
            const response = await axios.post("/api/users/login", user)
            
            console.log("Login Success : ", response.data);

            router.push("/profile")
            
            
        } catch (error : any) {
            console.log("Login Failed!");
            toast.error(error.message)
        }

    }


    useEffect(() => {

        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
        
    }, [user])


    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            {/* email */}
            <label htmlFor="email">email</label>

            <input 
                type = "email"
                id = "email"
                value = {user.email}
                onChange = {(e) => setUser({...user, email : e.target.value})}
                placeholder = "email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            {/* password */}
            <label htmlFor="password">password</label>

            <input 
                type = "password"
                id = "password"
                value = {user.password}
                onChange = {(e) => setUser({...user, password : e.target.value})}
                placeholder = "password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "No Login" : "Login"}
            </button>
            
            <Link href="/signup">Visit Signup Page</Link>

        </div>
    )
}
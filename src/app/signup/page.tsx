"use client"    // directive which makes this page a client component
import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

    // router comes from two places : router and navigation
    const router = useRouter()

    const [user, setUser] = useState({
        email : "",
        password : "",
        username : ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)


    const onSignUp = async() => {

        try {

            setLoading(true)

            // axios is much preferred because it handles some error states
            const response = await axios.post("/api/users/signup", user)
            
            console.log("Signup Success : ", response.data);

            router.push("/login")
            
            
        } catch (error : any) {
            console.log("Signup Failed!");
            toast.error(error.message)
        }

    }


    useEffect(() => {

        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
        
    }, [user])


    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />

            {/* username */}
            <label htmlFor="username">username</label>

            <input 
                type = "text"
                id = "username"
                value = {user.username}
                onChange = {(e) => setUser({...user, username : e.target.value})}
                placeholder = "username"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

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
                onClick={onSignUp}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "No Signup" : "Signup"}
            </button>
            
            <Link href="/login">Visit Login Page</Link>

        </div>
    )
}
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmail() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // const router = useRouter()

    const verifyUserEmail = async() => {

        try {

            const response = await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            setError(false)

        } catch (error : any) {
            setError(true)
            console.log(error.response.data);
        }

    }


    // the component should work only when it mounts for the first time.
    useEffect(() => {

        setError(false)

        // accessing the values from the url, and for this method the dependency array will be null
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // to utilize nextjs effectively, do this. And for this method the dependency array will contain 'router'
        // const {query} = router
        // const urlToken = query.token

    }, [])  // router for the second method


    useEffect(() => {

        setError(false)

        if (token.length > 0) {
            verifyUserEmail()
        }

    }, [token])



    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>

            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "No Token"}</h2>

            {verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                    <Link href = '/login'>
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                </div>
            )}

        </div>
    )
}
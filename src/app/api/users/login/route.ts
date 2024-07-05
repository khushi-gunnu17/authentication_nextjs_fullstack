import { connectDB } from "@/db/dbConfig";
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()


export async function POST(request : NextRequest) {

    try {

        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error : "User does not exists"}, {status : 400})   
        }
        
        console.log("User exists.");
        
        const validPasswd = await bcryptjs.compare(password, user.password)
        
        if(!validPasswd) {
            return NextResponse.json({error : "Check your credentials."}, {status : 400})   
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : '2h'})

        const response = NextResponse.json({
            message : "Logged in successfully !",
            success : true
        })

        response.cookies.set("token", token, {
            httpOnly : true
        })

        return response
        
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }

}
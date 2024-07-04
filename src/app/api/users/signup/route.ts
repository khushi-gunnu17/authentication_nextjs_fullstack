import { connectDB } from "@/db/dbConfig";
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

// it is necessary to connect the database everytime in these files of an api folder which is used for backend.
connectDB()


export async function POST(request : NextRequest) {
    
    try {

        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // validation necessary = give it here

        console.log(reqBody);

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error : "User alreay exists"}, {status : 400})
        }

        // bcrypt
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        // generatng a new user
        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        // saving the user in the database
        const savedUser = await newUser.save()
        console.log(savedUser);


        // sending verification email
        await sendEmail({email, emailType : "VERIFY", userId : savedUser._id})

        return NextResponse.json({
            message : "User Registered Successfully !",
            success : true,
            savedUser
        })
        
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}


// nextjs projects are deployed on vercel coz nextjs works on edge
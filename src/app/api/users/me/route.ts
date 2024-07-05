import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connectDB()


export async function POST(request : NextRequest) {

    // extracting data from token
    const userID = await getDataFromToken(request)

    const user = await User.findOne({_id : userID}).select("-password -username")

    // checking if there is no user.
    if(!user) {
        return NextResponse.json({error : "Invalid Token"}, {status : 400})
    }

    return NextResponse.json({
        message : "User found",
        data : user
    })

}
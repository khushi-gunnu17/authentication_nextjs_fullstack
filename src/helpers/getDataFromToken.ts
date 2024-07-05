import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const getDataFromToken = (request : NextRequest) => {

    try {

        const token = request.cookies.get("token")?.value || ""

        // in decodedToken, you get all the data which you have sent in the login information to the token.
        const decodedToken : any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.id


    } catch (error : any) {
        throw new Error(error.message)
    }

}
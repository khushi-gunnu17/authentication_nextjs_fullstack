import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

// should not use any typically, but right now here it is fine.
export const sendEmail = async({email, emailType, userId} : any) => {

    try {

        // gives special characters, but uuid library doesn't provide with any special characters
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // configuring mail for usage
        if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(userId, 
                { verifyToken : hashedToken, verifyTokenExpiry : Date.now() + 360000 }          // how much time is this ?
            )

        } else if (emailType === "RESET") {

            await User.findByIdAndUpdate(userId, 
                { forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry : Date.now() + 360000 }          // can give other time also
            )

        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "bbaf8616bb91c6",       // These should not be here, but in the env file
              pass: "********4d97"
            }
        });


        const mailOptions = {
            from: 'khushiastrogeek@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password" ,
            // text is also there which we can use as an option
            html: `<p>
                Click <a href="${process.env.DOMAIN}/verifyEmail?token = ${hashedToken} ">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser. 
                <br>  ${process.env.DOMAIN}/verifyEmail?token = ${hashedToken}
            </p>`
        }


        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    
    } catch (error : any) {
        throw new Error(error.message)
    }
}
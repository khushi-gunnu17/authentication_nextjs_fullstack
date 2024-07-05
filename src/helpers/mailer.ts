import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

// should not use 'any' typically, but right now here it is fine.
export const sendEmail = async({email, emailType, userId} : any) => {

    try {

        // This code gives special characters, but uuid library doesn't provide with any special characters in the hashed password.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // configuring mail for usage
        if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(userId, 
                {
                    $set : { 
                        verifyToken : hashedToken, 
                        verifyTokenExpiry : Date.now() + 3600000    // Expiry 1 hour from now
                    }
                }
            )

        } else if (emailType === "RESET") {

            await User.findByIdAndUpdate(userId, 
                {
                    $set : { 
                        forgotPasswordToken : hashedToken, 
                        forgotPasswordTokenExpiry : Date.now() + 3600000    // Expiry 1 hour from now
                    }
                }
            )

        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            },
            debug: true
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


        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    
    } catch (error : any) {
        throw new Error(error.message)
    }
}
import mongoose from 'mongoose'

// some functionalities in nextjs are different from reactjs's model folder here
const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : [true, "Please provide a username."],
        unique : true 
    },

    email : {
        type : String,
        required : [true, "Please provide an email."],
        unique : true 
    },

    password : {
        type : String,
        required : [true, "Please provide a password."]
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : false
    },

    forgotPasswordToken : String,

    forgotPasswordTokenExpiry : Date,

    verifyToken : String,

    verifyTokenExpiry : Date

})

// if the model is already made in the database, then handle that condition also in nextjs
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
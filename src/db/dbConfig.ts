import mongoose from 'mongoose'

export async function connectDB() {
    try {

        mongoose.connect(process.env.MONGO_URI!)        // ! - need to give this so as to ensure that type safety checking is there.
        const connection = mongoose.connection

        // can listen to the events of the connection
        connection.on('connected', () => {
            console.log('MongoDB Connected');
        })

        connection.on('error', (err) => {
            console.log('MongoDB Connection Error. PLease make sure DB is up and running.' + err);
            process.exit()
        })
        
    } catch (error) {
        console.log("Something went wrong in connecting to the db.");
        console.log(error);
    }
}
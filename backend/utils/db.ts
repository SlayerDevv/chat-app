import dotenv from 'dotenv'
import db from 'mongoose'
dotenv.config()

export function connectDB(){
    try {
         db.connect(process.env.MONGO_URL as string)
        console.log("Connected to MongoDB")
    } catch (err){
        console.log(err)
    }
}


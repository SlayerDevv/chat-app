import db from 'mongoose'
require('dotenv').config();

export function connectDB(){
    try {
         db.connect("mongodb+srv://slayer:123Qsd56&&&&@oddygames.yfnpr7l.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connected to MongoDB")
    } catch (err){
        console.log(err)
    }
}


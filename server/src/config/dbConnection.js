import mongoose from "mongoose"


const dbConnection = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`data base connected at : ${conn.connection.host}`)
    }catch(err){
        console.log(`data base error : ${err}`)
    }
}

export default dbConnection
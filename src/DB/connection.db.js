import mongoose from 'mongoose'

const connectDB=async()=>{
    const uri= process.env.DB_URI
    try {
        const result=await mongoose.connect(uri)

        console.log(result.models)
        console.log(`DB is connected successfully 👾`)

    } catch (error) {
        console.log(`Fail to connect to DB`,error)
    }
    
    

}





export default connectDB

import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path:path.join('./src/config/.env.dev')})
import connectDB from './DB/connection.db.js'
import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
import express from 'express'
import { globalErrorHandling } from './utils/response.js'

const bootstrap=async()=>{
    const app=express()
    const port= process.env.PORT || 5000
    //convert Buffer Data
    app.use(express.json())
    //DB
    await connectDB()

    //app-routing
    app.get('/',(req,res)=>res.json({message:'welcome to the app 👀'}))
    app.use('/auth',authController)
    app.use('/user',userController)
    app.all('{/*dummy}',(req,res)=>res.status(404).json({message:"page not found"}))



    app.use(globalErrorHandling)




    app.listen(port,()=>{
        console.log(`server is running on port${port}👾👾`)
    })
}
export default bootstrap

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import databaseConnection from './db/database.js'


const app=express()

const PORT=process.env.PORT || 3000
const URL=process.env.DATABASE_URL

// middlewares--
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routes load


// error handle--
// app.use(CustomErrorMiddle);

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
    databaseConnection(URL)
})
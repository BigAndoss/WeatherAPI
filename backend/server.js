import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, World!')
}) 






app.listen(3000,() => {
    connectDB()  // Connect to MongoDB before starting the server
  console.log(`Server started at http://localhost:${3000}`)
})
import express from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cityRoutes from './routes/city.route.js';
import weatherRoutes from './routes/weather.route.js';
import path from 'path';

const __dirname = path.resolve();
dotenv.config();

const app = express();
const PORT = process.env.PORT ;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Limit based on environment
  message: {
    status: 429,
    message: "Too many requests, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);
 

// Middleware to parse JSON data
app.use(express.json());

app.use('/api/cities', cityRoutes)
app.use('/api/weather', weatherRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'frontend/dist')));
  app.get('*',(req,res) => 
    res.sendFile(path.resolve(__dirname,"frontend",'dist','index.html') ))
}

// Start the server
app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB before starting the server
  console.log(`Server started at http://localhost:${PORT}`);
});

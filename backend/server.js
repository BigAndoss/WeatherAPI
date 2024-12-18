import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cityRoutes from './routes/city.route.js';
import weatherRoutes from './routes/weather.route.js';

dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.use('/api/cities', cityRoutes)
app.use('/api/weather', weatherRoutes)

// Start the server
app.listen(3000, () => {
  connectDB(); // Connect to MongoDB before starting the server
  console.log(`Server started at http://localhost:3000`);
});

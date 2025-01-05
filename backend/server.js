import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cityRoutes from './routes/city.route.js';
import weatherRoutes from './routes/weather.route.js';

const __dirname = path.resolve();
dotenv.config();

const app = express();
const PORT = process.env.PORT ;
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

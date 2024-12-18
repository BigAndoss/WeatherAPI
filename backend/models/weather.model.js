import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId, // Reference to City model
    ref: "City",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Defaults to current date if not provided
  },
  temperature: {
    type: Number, // Temperature in Celsius
    required: true,
  },
  humidity: {
    type: Number, // Humidity as a percentage
    required: true,
    min: 0,
    max: 100,
  },
  windSpeed: {
    type: Number, // Wind speed in km/h
    required: true,
    min: 0,
  },
  condition: {
    type: String, // e.g., 'Sunny', 'Cloudy', 'Rainy'
    enum: ["Sunny", "Rainy", "Cloudy", "Snowy", "Windy", "Stormy", "Foggy"], // Allowed values  
    required: false
  }
});

const Weather = mongoose.model("Weather", weatherSchema);
export default Weather;

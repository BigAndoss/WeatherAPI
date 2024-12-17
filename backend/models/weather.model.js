import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Reference to the 'City' model
    required: true,
  },
  temperature: {
    type: Number, // Temperature in Celsius, for example
    required: true,
  },
  humidity: {
    type: Number, // Percentage
    required: false,
  },
  windSpeed: {
    type: Number, // Wind speed in km/h
    required: false,
  },
  condition: {
    type: String, // e.g., 'Sunny', 'Cloudy', 'Rainy'
    required: false
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

const Weather = mongoose.model("Weather", weatherSchema);
export default Weather;

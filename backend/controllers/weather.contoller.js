import Weather from "../models/weather.model.js";
import City from "../models/city.model.js";

export const getWeatherForThreeDays = async (req, res) => {
  try {
    const { cityName, countryName, date } = req.query;

    // Validate the parameters
    if (!cityName || !countryName || !date) {
      return res.status(400).json({
        message: "City name, country name, and date are required.",
      });
    }

    // Convert user-provided date to a Date object
    const queryDate = new Date(date);
    if (isNaN(queryDate)) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Calculate the date range: the requested day + the next two days
    const startOfDay = new Date(queryDate.setUTCHours(0, 0, 0, 0));
    const endOfThreeDays = new Date(startOfDay);
    endOfThreeDays.setDate(startOfDay.getDate() + 3);

    // Debug: Log the date range
    console.log("Date range:", { startOfDay, endOfThreeDays });

    // Step 1: Find the city by name and country
    const city = await City.findOne({
      name: { $regex: new RegExp(cityName, "i") },
      "country.name": { $regex: new RegExp(countryName, "i") },
    });

    if (!city) {
      return res.status(404).json({
        message: `City '${cityName}' in country '${countryName}' not found.`,
      });
    }

    // Step 2: Find weather data for the requested date range
    const weatherData = await Weather.find({
      city: city._id,
      date: { $gte: startOfDay, $lt: endOfThreeDays }, // Match the 3-day range
    });

    if (weatherData.length === 0) {
      return res.status(404).json({
        message: `No weather data found for city '${cityName}' in country '${countryName}' within the requested date range.`,
      });
    }

    // Step 3: Return the weather data
    res.status(200).json({
      city: city.name,
      country: city.country.name,
      weather: weatherData,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Weather data by city name, country, and date
export const getWeatherByCityCountryAndDate = async (req, res) => {
  try {
    const { cityName, countryName, date } = req.query;

    // Validate the parameters
    if (!cityName || !countryName || !date) {
      return res.status(400).json({
        message: "City name, country name, and date are required.",
      });
    }

    // Convert user-provided date to a Date object
    const queryDate = new Date(date);
    if (isNaN(queryDate)) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Create a date range for the entire day
    const startOfDay = new Date(queryDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(queryDate.setUTCHours(23, 59, 59, 999));

    // Step 1: Find the city by name and country
    const city = await City.findOne({
      name: { $regex: new RegExp(cityName, "i") },
      "country.name": { $regex: new RegExp(countryName, "i") },
    });

    if (!city) {
      return res.status(404).json({
        message: `City '${cityName}' in country '${countryName}' not found.`,
      });
    }

    // Step 2: Find weather data for the specific date range
    const weatherData = await Weather.findOne({
      city: city._id,
      date: { $gte: startOfDay, $lt: endOfDay }, // Match the date range
    });

    if (!weatherData) {
      return res.status(404).json({
        message: `No weather data found for city '${cityName}' in country '${countryName}' on date '${date}'.`,
      });
    }

    // Step 3: Return the weather data
    res.status(200).json({
      city: city.name,
      country: city.country.name,
      date: weatherData.date,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      condition: weatherData.condition,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Weather data for a city by name
export const getWeatherByCityName = async (req, res) => {
  try {
    const { cityName } = req.query;

    // Validate cityName parameter
    if (!cityName) {
      return res.status(400).json({ message: "City name is required." });
    }

    // Step 1: Find the city by name
    const city = await City.findOne({ name: { $regex: new RegExp(cityName, "i") } });
    if (!city) {
      return res.status(404).json({ message: `City '${cityName}' not found.` });
    }

    // Step 2: Find weather data using the city's ID
    const weatherData = await Weather.find({ city: city._id });

    if (weatherData.length === 0) {
      return res.status(404).json({ message: `No weather data found for city '${cityName}'.` });
    }

    // Step 3: Respond with weather data
    res.status(200).json({
      city: city.name,
      country: city.country.name,
      weather: weatherData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all weather records
export const getAllWeather = async (req, res) => {
  try {
    const weatherData = await Weather.find().populate("city", "name country");
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET - Search Weather Data by City ID
export const getWeatherByCityId = async (req, res) => {
    try {
      const { cityId } = req.params;
  
      // Validate city ID format
      if (!cityId) {
        return res.status(400).json({ message: "City ID is required" });
      }
  
      // Query weather records for the given city ID
      const weatherData = await Weather.find({ city: cityId });
  
      if (weatherData.length === 0) {
        return res.status(404).json({ message: "No weather data found for the given city ID" });
      }
  
      res.status(200).json(weatherData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

// GET weather record by ID
export const getWeatherById = async (req, res) => {
  try {
    const weather = await Weather.findById(req.params.id).populate("city");
    if (!weather) return res.status(404).json({ message: "Weather record not found" });
    res.status(200).json(weather);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST create a new weather record
export const createWeather = async (req, res) => {
  try {
    const { city, date, temperature, humidity, windSpeed, condition } = req.body;
    const newWeather = new Weather({
      city,
      date,
      temperature,
      humidity,
      windSpeed,
      condition,
    });
    const savedWeather = await newWeather.save();
    res.status(201).json(savedWeather);
  } catch (error) {
    res.status(500).json({ message: "Error creating weather record", error: error.message });
  }
};

// PUT update a weather record by ID
export const updateWeather = async (req, res) => {
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedWeather) return res.status(404).json({ message: "Weather record not found" });
    res.status(200).json(updatedWeather);
  } catch (error) {
    res.status(500).json({ message: "Error updating weather record", error: error.message });
  }
};

// DELETE a weather record by ID
export const deleteWeather = async (req, res) => {
  try {
    const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
    if (!deletedWeather) return res.status(404).json({ message: "Weather record not found" });
    res.status(200).json({ message: "Weather record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting weather record", error: error.message });
  }
};

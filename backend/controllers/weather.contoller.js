import Weather from "../models/weather.model.js";
import City from "../models/city.model.js";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

export const getWeatherByCityAndDate = async (req, res) => {
  try {
    const { date,city } = req.query;

    // Validate the parameters
    if (!city || !date) {
      return res.status(400).json({
        message: "City and Date is required.",
      });
    }
    const cityId = await City.findOne({name: { $regex: new RegExp(city, "i")}})

    const weatherData = await Weather.findOne({
      "date": `${date}T00:00:00Z`,
      "city": cityId.id
    })

    if (!weatherData) {
      return res.status(404).json({
        message: `No weather data found on date '${date}'.`,
      });
    }
    res.status(200).json({
      city: cityId.name,
      date: weatherData.date,
      temperature: weatherData.temperature,
      condition: weatherData.condition,
      // weatherdata: weatherData
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

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
    // const  cityName  = "Milan"

    // Validate cityName parameter
    if (!cityName) {
      return res.status(400).json({ message: "City name is required." });
    }

    // Step 1: Find the city by name
    const city = await City.findOne({
      name: { $regex: new RegExp(cityName, "i") },
    });
    if (!city) {
      return res.status(404).json({ message: `City '${cityName}' not found.` });
    }
    console.log("City ID:", city._id);
    console.log("City ID type:", typeof city._id);

    // Convert to ObjectId explicitly
    const cityObjectId = new mongoose.Types.ObjectId(city._id);

    const weatherData = await Weather.find({
      city: "6756b29cf6968f6e71bbbcfb"
    });

    console.log("Query result:", weatherData);

    if (!weatherData) {
      return res
        .status(404)
        .json({ message: `No weather data found for city '${cityName}'.` });
    }

    // Step 3: Respond with weather data
    res.status(200).json({
      city: city.name,
      weather: weatherData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
// export const getWeatherByCityId = async (req, res) => {
//   try {
//     const { cityId } = req.params;

//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(cityId)) {
//       return res.status(400).json({ message: "Invalid city ID format" });
//     }

//     // Convert to ObjectId
//     const cityObjectId = new mongoose.Types.ObjectId(cityId);

//     // Find weather data
//     const weatherData = await Weather.find({ city: cityObjectId })
//       .populate('city', 'name country');

//     if (!weatherData || weatherData.length === 0) {
//       return res.status(404).json({
//         message: "No weather data found for this city ID"
//       });
//     }

//     res.status(200).json(weatherData);

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
export const getWeatherByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    const { date } = req.query;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: "Invalid city ID format" });
    }

    // Validate and parse date
    if (!date || isNaN(new Date(date))) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    // Create date range for the given date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // console.log(cityId)
    // console.log(date)

    // Find weather data with date filter
    const weatherData = await Weather.find({
      city: new mongoose.Types.ObjectId(cityId),
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("city", "name country");
    console.log(weatherData);
    if (!weatherData || weatherData.length === 0) {
      return res.status(404).json({
        message: `No weather data found for city ID ${cityId} on ${date}`,
      });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET weather record by ID
export const getWeatherById = async (req, res) => {
  const { date } = req.params;
console.log(date)
  // Function to validate ISO 8601 format and extract the date
  const isValidISODate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD
    if (!dateRegex.test(dateString)) return false;

    const date = new Date(dateString);
    const [year, month, day] = dateString.split("-").map(Number);

    // Ensure parsed date matches the input and is valid
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  if (!isValidISODate(date)) {
    return res.status(400).json({
      message: "Invalid date format. Please use YYYY-MM-DD.",
    });
  }

  try {
    // Define the start and end of the date range
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    // Query the database for weather data within the range
    const weatherData = await Weather.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("city");

    if (!weatherData || weatherData.length === 0) {
      return res.status(404).json({ message: "No weather data found for this date." });
    }

    // Format the response data
    const formattedData = weatherData.map((data) => ({
      city: data.city?.name || "Unknown City",
      temperature: data.temperature || "N/A",
      condition: data.condition || "Unknown",
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "An error occurred while retrieving weather data." });
  }
};

// POST create a new weather record
export const createWeather = async (req, res) => {
  try {
    const { city, date, temperature, humidity, windSpeed, condition } =
      req.body;
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
    res
      .status(500)
      .json({ message: "Error creating weather record", error: error.message });
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

    if (!updatedWeather)
      return res.status(404).json({ message: "Weather record not found" });
    res.status(200).json(updatedWeather);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating weather record", error: error.message });
  }
};

// DELETE a weather record by ID
export const deleteWeather = async (req, res) => {
  try {
    const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
    if (!deletedWeather)
      return res.status(404).json({ message: "Weather record not found" });
    res.status(200).json({ message: "Weather record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting weather record", error: error.message });
  }
};

export const getWeatherByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required in YYYY-MM-DD format",
      });
    }

    // Convert date to ISO format
    const queryDate = new Date(date);
    const formattedDate = queryDate.toISOString().split("T")[0] + "T00:00:00";

    // Debug logs
    console.log("Input date:", date);
    console.log("Formatted date:", formattedDate);

    // First check all weather records

    // Try exact match query
    const weatherData = await Weather.find({
      _id: "6772dc3f8d18ce9f365f1e31",
    });

    console.log("Query result:", weatherData);

    if (!weatherData || weatherData.length === 0) {
      return res.status(404).json({
        message: `No weather data found for date ${date}`,
      });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getWeatherByCity = async (req, res) => {
  try {
    const weather = await Weather.findOne({
      city: new ObjectId("6756b29cf6968f6e71bbbcfb")
      // date:"2025-01-02T00:00:00Z"
    }).populate("city", "name country");
    console.log(weather)
    res.status(200).json(weather);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting weather data", error: error.message });
  }
}



// export const getWeatherByCityId0001 = async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     // Get the cityId from the request parameters
//     //  Find weather data that matches the cityId
//     const weatherData = await Weather.find({ city: cityId });
//     if (!weatherData.length) {
//       return res
//         .status(404)
//         .json({ message: "Weather data not found for the specified city" });
//     }
//     // Return the result
    
//     res.json(weatherData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import City from "../models/city.model.js";
import mongoose from "mongoose";

// GET - Search for a city by name and country
export const getCityByNameAndCountry = async (req, res) => {
    try {
      const { name, country } = req.query; // Extract query parameters
  
      // Validate that both parameters are provided
      if (!name || !country) {
        return res.status(400).json({
          message: "Both 'name' and 'country' parameters are required to search.",
        });
      }
  
      // Query to search for the city
      const city = await City.findOne({
        name: { $regex: new RegExp(name, "i") }, // Case-insensitive search for city name
        "country.name": { $regex: new RegExp(country, "i") }, // Case-insensitive search for country name
      });
  
      if (!city) {
        return res.status(404).json({
          message: `No city found with name '${name}' in country '${country}'.`,
        });
      }
  
      // Return the matching city
      res.status(200).json(city);
    } catch (error) {
      console.error("Error fetching city:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getCity = async (req, res) => {
    try {
      const cities = await City.find({});
      res.status(200).json({success:true, data:cities});
    } catch (error) {
      console.log("Error in fetching cities:", error.message);
      res.status(500).json({success:false, message: "Server error" });
    }}

export const postCity = async (req, res) => {
  try {
    const { name, country, capital } = req.body;

    // Validate required fields
    if (!name || !country?.name || !country?.shortHand || !country?.location) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create a new city instance
    const newCity = new City({
      name,
      country: {
        name: country.name,
        shortHand: country.shortHand,
        location: {
          continent: country.location.continent,
          region: country.location.region,
        },
      },
      capital: capital || false,
    });

    // Save the city to the database
    const savedCity = await newCity.save();

    // Respond with the newly created city
    res.status(201).json(savedCity);
  } catch (error) {
    console.error("Error adding city:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export const putCity = async (req, res) => {
    try {
      const { id } = req.params; // Extract city ID from the URL
      const { name, country, capital } = req.body;
  
      // Build an object for the fields to update
      const updateFields = {};
      if (name) updateFields.name = name;
      if (country) {
        updateFields["country.name"] = country.name;
        updateFields["country.shortHand"] = country.shortHand;
        if (country.location) {
          updateFields["country.location.continent"] = country.location.continent;
          updateFields["country.location.region"] = country.location.region;
        }
      }
      if (capital !== undefined) updateFields.capital = capital;
  
      // Validate that there is at least one field to update
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update" });
      }
  
      // Update the city document
      const updatedCity = await City.findByIdAndUpdate(
        id,                // The ID of the city to update
        { $set: updateFields }, // Fields to update
        { new: true, runValidators: true } // Return the updated document and validate the data
      );
  
      // Check if the city exists
      if (!updatedCity) {
        return res.status(404).json({ message: "City not found" });
      }
  
      // Return the updated document
      res.status(200).json(updatedCity);
    } catch (error) {
      console.error("Error updating city:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }

  export const deleteCity = async (req, res) => {
    const {id} = req.params
    
    try {
      await City.findByIdAndDelete(id);
      res.status(200).json({ success:true, message: "City deleted successfully" });
    } catch (error) {
      res.status(404).json({ success:false, message:"City not found" }); //
    }
  }
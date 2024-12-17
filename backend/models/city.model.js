import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    country: {
      name: {
        type: String,
        required: true,
      },
      shortHand: {
        type: String,
        required: true,
      },
      location: {
        continent: {
          type: [String], 
          required: true,
        },
        region: {
          type: String,
          required: true,
        },
      },
    },
    capital: {
      type: Boolean,
      default: false,
    },
  });

const City = mongoose.model('City', citiesSchema);
export default City;
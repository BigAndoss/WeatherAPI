import express from "express";
import {
  getAllWeather,
  getWeatherByCityCountryAndDate,
  getWeatherByCityName,
  getWeatherByCityId,
  getWeatherById,
  createWeather,
  updateWeather,
  deleteWeather,
  getWeatherForThreeDays,
  getWeatherByCityAndDate,
  getWeatherByDate,
  getWeatherByCity,
  getWeatherForCountry,
  // getWeatherByCityId0001
} from "../controllers/weather.contoller.js";

const router = express.Router();

router.get("/", getAllWeather);

router.get("/country",getWeatherForCountry)

router.get("/cityWeather", getWeatherByCity);

router.get("/citynow", getWeatherByCityAndDate);

router.get("/search", getWeatherByCityCountryAndDate);

router.get("/three-days", getWeatherForThreeDays);

router.get("/city/:cityId", getWeatherByCityId);

router.get("/city", getWeatherByCityName);

router.get("/date", getWeatherByDate);

router.get("/:id", getWeatherById);

// POST request to add a new city
router.post("/", createWeather);

router.put("/:id", updateWeather);

router.delete("/:id", deleteWeather);
// router.get("/:cityId", getWeatherByCityId0001);

export default router;

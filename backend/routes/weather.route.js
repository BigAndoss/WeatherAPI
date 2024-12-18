import express from 'express';
import { getAllWeather, getWeatherByCityName, getWeatherByCityId, getWeatherById, createWeather, updateWeather, deleteWeather } from '../controllers/weather.contoller.js';

const router = express.Router();

router.get('/', getAllWeather);

router.get("/city/:cityId", getWeatherByCityId);

router.get("/city", getWeatherByCityName);

router.get('/:id', getWeatherById);

// POST request to add a new city
router.post('/', createWeather);

router.put('/:id', updateWeather);


router.delete("/:id", deleteWeather);


export default router
import express from 'express';
import { getCity, getCityByNameAndCountry, postCity, putCity, deleteCity } from '../controllers/city.controller.js';

const router = express.Router();

router.get('/', getCity);

router.get("/search", getCityByNameAndCountry);

// POST request to add a new city
router.post('/', postCity);

router.put('/:id', putCity);


router.delete("/:id", deleteCity);


export default router
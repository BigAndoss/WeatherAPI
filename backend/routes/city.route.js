import express from 'express';
import { getCity, postCity, putCity, deleteCity } from '../controllers/city.controller.js';

const router = express.Router();

router.get('/', getCity);

// POST request to add a new city
router.post('/', postCity);

router.put('/:id', putCity);


router.delete("/:id", deleteCity);


export default router
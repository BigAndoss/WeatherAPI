import { get } from "mongoose";
import {create} from "zustand";
import { getCity } from "../../../backend/controllers/city.controller";

export const useWeatherStore = create((set, get) => ({
    city: 'Prishtina',
    setCity: (city) => set({city}),
    getCity: () => get().city,
    getWeather: async () => {
        const city = get().city;
        console.log(city);
        const response = await fetch(`/api/weather/citynow?city=${city}&date=2025-01-02`);
        const data = await response.json();
        console.log(data);
        return data;
    }
}));
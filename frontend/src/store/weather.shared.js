import {create} from "zustand";

const formatDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const useWeatherStore = create((set, get) => ({
    city: 'Prishtina',
    country:'Kosovo',
    weatherData: null,
    isLoading: true,
    date: formatDate(),
    setCity: (city) => set({city}),
    setCountry: (country) => set({country}),
    getCountry: () => get().country,
    getCity: () => get().city,
    getWeather: async () => {
        set({ isLoading: true });
        try {
            const city = get().city;
            const currentDate = formatDate();
            set({ date: currentDate });
            const response = await fetch(`/api/weather/citynow?city=${city}&date=${currentDate}`);
            const data = await response.json();
            set({ weatherData: data, isLoading: false })
            return data;
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
    getWeatherByDate: async (date) => {
        set({ isLoading: true });
        try {
            const city = get().city;
            const response = await fetch(`/api/weather/citynow?city=${city}&date=${date}`);
            const data = await response.json();
            set({ weatherData: data, isLoading: false })
            return data;
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
    getWeatherForCountry: async () => {
        set({ isLoading: true });
        try {
            const country = get().country;
            const currentDate = formatDate();
            set({ date: currentDate });
            const response = await fetch(`/api/weather/country?country=${country}&date=${currentDate}`);
            const data = await response.json();
            set({ weatherData: data, isLoading: false })
            console.log(data);
            return data;
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    }
}));


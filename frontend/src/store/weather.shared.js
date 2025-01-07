import {create} from "zustand";

const formatDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const useWeatherStore = create((set, get) => ({
    city: 'Prishtina',
    weatherData: null,
    isLoading: true,
    date: formatDate(),
    setCity: (city) => set({city}),
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
    }
}));


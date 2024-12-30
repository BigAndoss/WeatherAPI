import { create } from "zustand";

const useWeatherStore = create((set) => ({
  cityInfo: {
    city: "Ferizaj",
    temperature: "-1°C",
    condition: "Snowy",
  },
  updateCityInfo: (newCityInfo) => set({ cityInfo: newCityInfo }),
}));

export default useWeatherStore;

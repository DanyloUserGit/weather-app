import { weatherInstance } from "@/lib/weather";
import { WeatherProps } from "@/types";
import { useEffect, useState } from "react";
import Spin from "../global/Spin";
import Typography from "../global/Typography";

export default function Modal({ lat, lon, onClose }: WeatherProps) {
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    const res = await weatherInstance(`?lat=${lat}&lon=${lon}`);
    setWeather(res.data);
  };

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(() => {
      fetchWeather();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lat, lon]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-8 rounded-xl w-80 relative shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-[20px]"
        >
          ×
        </button>
        <Typography variant="title">Current Weather</Typography>
        <div className="flex flex-col items-center mt-3">
          {!weather ? (
            <Spin />
          ) : (
            <div className="m-y-2 text-left flex flex-col gap-[8px]">
              <Typography variant="text">
                <strong>Temperature:</strong>{" "}
                {weather.current_weather.temperature}°C
              </Typography>
              <Typography variant="text">
                <strong>Condition:</strong>{" "}
                {weather.current_weather.weathercode === 0 ? "Clear" : "Cloudy"}
              </Typography>
              <Typography variant="text">
                <strong>High:</strong> {weather.daily.temperature_2m_max[0]}°C
              </Typography>
              <Typography variant="text">
                <strong>Low:</strong> {weather.daily.temperature_2m_min[0]}°C
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

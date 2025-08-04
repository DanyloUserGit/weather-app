import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "No coordinates provided" });
  }

  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get current weather" });
  }
}

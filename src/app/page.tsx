"use client";
import NavBar from "@/components/NavBar";
import axios from "axios";
import SplashScreen from "@/components/SplashScreen";

import { useQuery } from "@tanstack/react-query";
type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: City;
};

type WeatherForecast = {
  dt: number;
  main: MainWeatherData;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
};

type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Sys = {
  pod: string;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lat: number;
  lon: number;
};

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=52`
      );
      return data;
    },
  });

  if (isPending)
    return (
      <div className="flex items-center justify-center bg-[#442b5b] min-h-screen text-gray-100">
        <p className="animate-pulse ">Is Loading...</p>
      </div>
    );

  console.log("data", data?.city.country);
  console.log("API Key:", process.env.NEXT_PUBLIC_WEATHER_KEY); // Check if the API key is correctly loaded

  return (
    <div className="bg-gradient-to-tr from-[#20204f] via-[#4b1e4b] to-[#511633] min-h-screen flex flex-col">
      <NavBar />
    </div>
  );
}

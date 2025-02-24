"use client";

import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import Container from "@/components/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import WeatherDetails from "@/components/WeatherDetails";
import convertMetersToKm from "@/utils/convertMetersToKm";
import convertWindSpeed from "@/utils/convertWindSpeed";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";

import WeatherSkeleton from "@/components/WeatherSkeleton";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
}

interface WeatherEntry {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export default function Home() {
  const [place] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const { isPending, data, refetch } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=52`
      );
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  console.log("data:", data);
  const firstDate = data?.list[0];
  const city = data?.city?.name;
  // Logic for mapping single value out of same repeated values
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  if (isPending)
    return (
      <div className="flex items-center justify-center bg-[#442b5b] min-h-screen text-gray-100">
        <p className="animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#f8f8fa] via-[#ebecf2] via-70% to-[#8cbad4] dark:bg-gradient-to-tr dark:from-[#11111f] dark:via-[#1c0c1b] dark:via-70% dark:to-[#544d50] text-black transition-all duration-300">
      <div>
        <NavBar location={data?.city.name} />
        <div className="flex flex-center item-center "></div>
      </div>
      <main className="px-3 max-w-7x1 flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            {/* Today's data */}
            <section
              className="flex gap-1 text-2xl items-end text-white relative border-none rounded-2xl bg-[url('/images/light-theme.jpg')]
             dark:bg-[url('/images/dark-theme.jpg')]"
            >
              <div className="flex flex-col">
                <div className="pt-10 pl-20 flex-1  ">
                  <span className="text-9xl">
                    {convertKelvinToCelsius(firstDate?.main.temp ?? 0)}°
                  </span>
                  <span className="text-2xs -ml-7 -mt-10">
                    Feels like{" "}
                    {convertKelvinToCelsius(firstDate?.main.feels_like ?? 0)}°
                  </span>
                  <div className="hidden lg:block">
                    <div className="flex flex-col text-2xl text-right pb-10 absolute right-0 -bottom-0 transform -translate-y-1/2 pr-10">
                      {/* Weather Icon */}
                      <img
                        src={`https://openweathermap.org/img/wn/${firstDate?.weather[0]?.icon}@2x.png`}
                        alt={
                          firstDate?.weather[0]?.description || "Weather icon"
                        }
                        className="w-15 h-15"
                      />
                      {/* Weather Description */}
                      <p className="text-sm text-white capitalize">
                        (
                        {firstDate?.weather[0]?.description || "No description"}
                        )
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center pl-10 pt-10  pb-5">
                  <p className="text-ellipsis text-2xl">{city}</p>
                  <h2 className="flex gap-1  items-end">
                    <p>{format(parseISO(firstDate?.dt_txt ?? ""), "EEEE")}</p>
                    <p>
                      {format(parseISO(firstDate?.dt_txt ?? ""), "(MMMM, d)")}
                    </p>
                  </h2>

                  <div className="flex flex-col text-2xl text-right pb-5 absolute right-0 -bottom-10 transform -translate-y-1/2 pr-10">
                    <p>
                      H :{" "}
                      {convertKelvinToCelsius(firstDate?.main.temp_max ?? 0)}°
                    </p>
                    <p>
                      L :{" "}
                      {convertKelvinToCelsius(firstDate?.main.temp_min ?? 0)}°
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* time and weather icon */}
            <section>
              <Container className="flex gap-1 text-2xl items-center">
                <div className="flex gap-10 sm:gap-15 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((entry, i) => (
                    <div
                      key={i}
                      className="px-5 flex flex-col justify-center items-center gap-2 text-xs font-semibold "
                    >
                      {/* Time */}
                      <p className="whitespace-nowrap text-center">
                        {format(parseISO(entry.dt_txt), "h:mm a")}
                      </p>

                      {/* Weather Icon */}
                      <img
                        src={`https://openweathermap.org/img/wn/${entry.weather[0]?.icon}@2x.png`}
                        alt={entry.weather[0]?.description || "Weather icon"}
                        className="w-12 h-12"
                      />

                      {/* Weather Condition */}
                      <p className="capitalize text-center">
                        {entry.weather[0]?.description}
                      </p>

                      {/* Temperature */}
                      <p className="text-center">
                        {convertKelvinToCelsius(entry?.main.temp ?? 0)}°
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
              <Container className="px-6 gap-4 justify-between overflow-x-auto flex ">
                <WeatherDetails
                  visibility={convertMetersToKm(
                    firstDate?.visibility ?? 100000
                  )}
                  airPressure={`${firstDate?.main.pressure} hPa`}
                  humidity={`${firstDate?.main.humidity} %`}
                  windSpeed={convertWindSpeed(firstDate?.wind.speed ?? 3.36)}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1739753681),
                    "H:mm "
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1739753681),
                    "H:mm "
                  )}
                />
              </Container>
            </section>
            {/* 7 days forecast data */}
            <section className="flex flex-col w-full">
              <p className=" text-black dark:text-white text-2xl">
                Forecast (7 days)
              </p>
              {firstDataForEachDate.map((d, i) => (
                <ForecastWeatherDetail
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  date={d?.dt_txt ? format(parseISO(d.dt_txt), "dd.MM") : ""}
                  day={d?.dt_txt ? format(parseISO(d.dt_txt), "EEEE") : ""}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  visibility={`${convertMetersToKm(d?.visibility ?? 0)}`}
                  humidity={`${d?.main.humidity ?? 0}`}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 0)}`}
                  airPressure={`${d?.main.pressure ?? 0}`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1739753681),
                    "H:mm "
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1739753681),
                    "H:mm "
                  )}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

import React from "react";
import Container from "./Container";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Monday",
    temp,
    feels_like,
    description = "Weather Icon",
  } = props;
  return (
    <Container className="gap-4 ">
      {/* left-section */}
      <section className="flex gap-10 items-center px-5 ">
        <div className=" flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={description}
            className="h-20 w-20"
          />
          <p className="text-xl">{date}</p>
          <p>{day}</p>
        </div>
        <div className="flex flex-col px-4 items-center ">
          <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap ">
            <span>Feels like {convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize pt-2.5 text-2sm ">{description}</p>
        </div>
      </section>
      {/* Right-section */}
      <section className="overflow-x-auto flex justify-between px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}

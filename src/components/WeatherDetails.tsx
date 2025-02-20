import React from "react";
import { FaEye } from "react-icons/fa";
import { FiDroplet } from "react-icons/fi";
import { FaWind } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";

export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  const {
    visibility = "25km",
    humidity = "61%",
    windSpeed = "7km/h",
    airPressure = "1021 hPa",
    sunrise = "6.20",
    sunset = "18.48",
  } = props;
  return (
    <div
      className="flex
      flex-row
      justify-between
      items-center
      gap-6
      w-full
      overflow-x-auto
      p-4 "
    >
      <SingleWeatherDetails
        icon={<FaEye style={{ color: "#d9ab56" }} />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetails
        icon={<FiDroplet style={{ color: "#21cae2" }} />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetails
        icon={<FaWind style={{ color: "#f1dede" }} />}
        information="Wind Speed"
        value={windSpeed}
      />
      <SingleWeatherDetails
        icon={<BsSpeedometer style={{ color: "#000000" }} />}
        information="Air Pressure"
        value={airPressure}
      />
      <SingleWeatherDetails
        icon={<GiSunrise style={{ color: "#ede11a" }} />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetails
        icon={<GiSunset style={{ color: "#edb61a" }} />}
        information="Sunset"
        value={sunset}
      />
    </div>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
      <p className="whitespace-nowrap ">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}

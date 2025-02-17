"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmittedValue(searchValue);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=52`
      );
      return data;
    },
  });

  console.log("data:", data);
  const firstDate = data?.list[0];
  const city = data?.city?.name;

  if (isPending)
    return (
      <div className="flex items-center justify-center bg-[#442b5b] min-h-screen text-gray-100">
        <p className="animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-tr from-[#20204f] via-[#4b1e4b] to-[#511633] min-h-screen flex flex-col">
      <div>
        <NavBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>
      <main className="px-3 max-w-7x1 flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's data */}
        <section
          className="flex gap-1 text2xl items-end text-white relative border-none rounded-2xl"
          style={{ backgroundImage: "url('/images/background-image.jpg')" }}
        >
          <div className="flex flex-col  ">
            <div className="pt-10 pl-20 flex-1  ">
              <span className="text-9xl">
                {convertKelvinToCelsius(firstDate?.main.temp ?? 0)}°
              </span>
              <span className="text-2xs -ml-7 -mt-10">
                Feels like{" "}
                {convertKelvinToCelsius(firstDate?.main.feels_like ?? 0)}°
              </span>
            </div>
            <div className="flex flex-col justify-center pl-10 pt-10  pb-5">
              <p className="text-ellipsis text-2xl">{city}</p>
              <h2 className="flex gap-1  items-end">
                <p>{format(parseISO(firstDate?.dt_txt ?? ""), "EEEE")}</p>
                <p>{format(parseISO(firstDate?.dt_txt ?? ""), "(MMMM, d)")}</p>
              </h2>

              <div className="flex flex-col text-2xl text-right pb-5 absolute right-0 -bottom-10 transform -translate-y-1/2 pr-10">
                <p>
                  H : {convertKelvinToCelsius(firstDate?.main.temp_max ?? 0)}°
                </p>
                <p>
                  L : {convertKelvinToCelsius(firstDate?.main.temp_min ?? 0)}°
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* 7 days forecast data */}
        <section></section>
      </main>
    </div>
  );
}

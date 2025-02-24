"use client";
import Image from "next/image";
import React from "react";

const SplashScreen = ({ isFadingOut }: { isFadingOut: boolean }) => {
  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-[#20204f] via-[#4b1e4b] to-[#511633] z-50 transition-opacity duration-300 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/WeatherIcon.svg"
        alt="Weather Icon"
        width={100}
        height={100}
      />
      <h1 className="text-4xl font-bold text-white animate-pulse">WEATHER</h1>
      <h1 className="text-4xl font-bold text-white animate-pulse">FORECAST</h1>
    </div>
  );
};

export default SplashScreen;

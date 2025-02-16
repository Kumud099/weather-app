"use client";
import React, { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import SearchBox from "./SearchBox";

export default function NavBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Search value:", searchValue);
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 text-white py-4">
      <div className="w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <h2 className="text-gray-300 text-3xl">Weather</h2>
        <section className="flex gap-2 items-center bg-center">
          <MdMyLocation className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          <HiLocationMarker className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          <p className="text-gray-300">Nepal</p>
          <div>
            <SearchBox
              value={searchValue}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

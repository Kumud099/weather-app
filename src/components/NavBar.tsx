"use client";
import React from "react";
import { MdMyLocation } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import SearchBox from "./SearchBox";

type NavBarProps = {
  searchValue: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearchSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function NavBar({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: NavBarProps) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 text-white py-4">
      <div className="w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <h2 className="text-gray-300 text-3xl">Weather</h2>
        <section className="flex gap-2 items-center bg-center">
          <MdMyLocation className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          <HiLocationMarker className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          {/* <p className="text-gray-300">Nepal</p> */}
          <SearchBox
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          />
        </section>
      </div>
    </nav>
  );
}

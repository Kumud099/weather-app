import React from "react";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/utils/cn";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-7 bg-[#2c1b3a] p-2 rounded-md w-full border border-gray-500",
        props.className
      )}
    >
      <input
        className="bg-transparent text-white placeholder-gray-300 w-[230px] px-4 py-2 focus:outline-none h-full "
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search a location..."
      />
      <button type="submit" className="text-gray-200">
        <FaSearch className="text-gray-300" />
      </button>
    </form>
  );
}

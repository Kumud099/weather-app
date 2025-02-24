import { cn } from "@/utils/cn";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-full text-white bg-white border rounded-xl flex my-5 py-10 shadow-[4px_-4px_10px_rgba(0,0,0,0.2)] bg-gradient-to-tr from-[#272738] via-[#485f83] to-[#4191a9] border-none dark:bg-gradient-to-tr dark:from-[#b578a9] dark:via-[#200c29] dark:to-[#361649]",
        props.className
      )}
    />
  );
}

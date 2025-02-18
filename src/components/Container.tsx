import { cn } from "@/utils/cn";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-full text-white bg-white border rounded-xl flex my-5 py-10 shadow-[4px_-4px_10px_rgba(0,0,0,0.2)] bg-gradient-to-tr from-[#30304c] via-[#582a58] to-[#3b1326] border-none",
        props.className
      )}
    />
  );
}

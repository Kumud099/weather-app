"use client";

import { Button } from "@/components/ui/button";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full dark:bg-white"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaSun className="absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></FaSun>
      <FaMoon className="absolute h-10 w-10 rotate-90 scale-0 dark:scale-100 dark:-rotate-0"></FaMoon>
    </Button>
  );
}

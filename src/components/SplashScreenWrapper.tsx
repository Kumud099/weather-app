"use client";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

const SplashScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFadingOut(true), 2000);
    const hideTimer = setTimeout(() => setShowSplash(false), 2300);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen isFadingOut={isFadingOut} />;
  }

  return <>{children}</>;
};

export default SplashScreenWrapper;

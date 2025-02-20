"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import type { Metadata } from "next";
import "./globals.css";
import SplashScreenWrapper from "@/components/SplashScreenWrapper";

// export const metadata: Metadata = {
//   title: "My App",
//   description: "A Next.js App",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          <SplashScreenWrapper>{children}</SplashScreenWrapper>
        </body>
      </QueryClientProvider>
    </html>
  );
}

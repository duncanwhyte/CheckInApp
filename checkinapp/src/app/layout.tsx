import type { Metadata } from "next";
import "./globals.css";
import TaxAssistHeader from "./components/TaxAssistHeader";

export const metadata: Metadata = {
  title: "Check In App",
  description: "Check in app for users to check in and out of a location showing which users are at a location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <TaxAssistHeader />
        {children}
      </body>
    </html>
  );
}

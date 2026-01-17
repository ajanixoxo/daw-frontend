import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DAW",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

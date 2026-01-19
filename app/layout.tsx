import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { Toaster } from "sonner";
import SmoothScroll from "@/lib/smooth-scroll";

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
          <SmoothScroll>{children}</SmoothScroll>

          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

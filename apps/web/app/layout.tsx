import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/app/QueryProvider";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export const metadata: Metadata = {
  title: "Pogonyalis",
  description: "Next.js app for Pogonyalis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple and efficient application for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description:
      "A simple and efficient application for managing personal notes",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider>
        <TanStackProvider>
          <AuthProvider>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
          {modal}
          </AuthProvider>
        </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

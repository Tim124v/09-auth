import type { Metadata } from "next";
import Link from "next/link";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub.com/404",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <div style={{ textAlign: "center" }}>
        <Link
          href="/"
          className={css.link}
          aria-label="Navigate back to home page"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

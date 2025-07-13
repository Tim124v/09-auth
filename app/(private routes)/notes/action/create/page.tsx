import type { Metadata } from "next";
import CreateNote from "./CreateNote";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub application",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub application",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}

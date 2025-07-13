import React from "react";
import type { Metadata } from "next";
import { fetchNotesServer } from "@/lib/api/serverNotesApi";
import NotesClient from "./Notes.client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const encodedTag = encodeURIComponent(tag);
  const getDescription = (tagName: string) => {
    if (tagName === "All") {
      return "Browse and manage all your notes in one convenient location using NoteHub";
    }
    return `Browse and manage your ${tagName.toLowerCase()} notes in NoteHub`;
  };
  const getTitle = (tagName: string) => {
    if (tagName === "All") {
      return "All Notes | NoteHub";
    }
    return `${tagName} Notes | NoteHub`;
  };
  return {
    title: getTitle(tag),
    description: getDescription(tag),
    openGraph: {
      title: getTitle(tag),
      description: getDescription(tag),
      url: `https://notehub.com/notes/filter/${encodedTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub ${tag} Notes`,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesByTagPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const tagParam = tag === "All" ? undefined : tag;

  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    
    const initialNotes = await fetchNotesServer(cookieString, undefined, 1, tagParam);
    return <NotesClient initialNotes={initialNotes} tag={tag} />;
  } catch (error: unknown) {
    console.error("Error loading notes:", error);
    if (error instanceof Error && error.message === "403") {
      redirect("/sign-in");
    }
    return <div>Failed to load notes</div>;
  }
}

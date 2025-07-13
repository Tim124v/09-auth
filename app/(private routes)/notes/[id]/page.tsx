import React from "react";
import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverNotesApi";
import NoteDetails from "./NoteDetails.client";
import styles from "./NoteDetails.module.css";
import { cookies } from "next/headers";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;
  
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const note = await fetchNoteByIdServer(cookieString, noteId);

    return {
      title: `${note.title} | NoteHub`,
      description:
        note.content.substring(0, 160) +
        (note.content.length > 160 ? "..." : ""),
      openGraph: {
        title: `${note.title} | NoteHub`,
        description:
          note.content.substring(0, 160) +
          (note.content.length > 160 ? "..." : ""),
        url: `https://notehub.com/notes/${noteId}`,
        siteName: "NoteHub",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `NoteHub - ${note.title}`,
          },
        ],
        type: "article",
      },
    };
  } catch {
    return {
      title: "Note Not Found | NoteHub",
      description: "The requested note could not be found",
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => fetchNoteByIdServer(cookieString, noteId),
    });
  } catch (error) {
    console.error("Error prefetching note:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <div className={styles.item}>
          <NoteDetails noteId={noteId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}

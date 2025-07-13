import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverNotesApi";
import NotePreview from "./NotePreview.client";
import { cookies } from "next/headers";

export default async function NotePreviewModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const noteId = parseInt(resolvedParams.id);

  const queryClient = new QueryClient();

  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => fetchNoteByIdServer(cookieString, resolvedParams.id),
    });
  } catch (error) {
    console.error("Error prefetching note for modal:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={noteId} />
    </HydrationBoundary>
  );
}

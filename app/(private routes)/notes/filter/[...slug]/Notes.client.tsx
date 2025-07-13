"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/clientApi";
import { useDebounce } from "@/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tagParam = tag === "All" ? undefined : tag;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notes", page, tagParam, debouncedSearchQuery],
    queryFn: () => fetchNotes(debouncedSearchQuery, page, tagParam),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    retry: false,
    enabled: mounted,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const showLoading = isLoading && !data?.notes;

  if (!mounted) {
    return (
      <div>
        <div className={styles.toolbar}>
          <h1>Notes</h1>
          <div className={styles.toolbarRight}>
            <SearchBox value="" onChange={() => {}} />
            <Link href="/notes/action/create" className={styles.button}>
              Create New Note
            </Link>
          </div>
        </div>
        <NoteList notes={initialNotes.notes} tag={tag} />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <h1 className={styles.notesTitle}>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <Link href="/notes/action/create" className={styles.button}>
            Create New Note
          </Link>
        </div>
      </div>

      {showLoading ? (
        <p>Loading...</p>
      ) : data?.notes !== undefined ? (
        <NoteList notes={data.notes} tag={tag} />
      ) : (
        <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      {isFetching && data?.notes && (
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Updating...
        </div>
      )}
    </div>
  );
}

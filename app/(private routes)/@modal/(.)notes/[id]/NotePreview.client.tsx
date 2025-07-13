"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById, updateNote } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import styles from "./NotePreview.module.css";
import { useState } from "react";

interface NotePreviewProps {
  noteId: number;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState<{
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  } | null>(null);
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId.toString()),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <Loader />
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <Error message="Failed to load note" />
      </Modal>
    );
  }

  const handleEdit = () => {
    setFormState({
      title: note.title,
      content: note.content,
      tag: note.tag,
    });
    setEditMode(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) =>
      prev
        ? { ...prev, [name]: name === "tag" ? value as typeof prev.tag : value }
        : { title: "", content: "", tag: "Todo" }
    );
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState) return;
    await updateNote(note.id.toString(), formState);
    await queryClient.invalidateQueries({ queryKey: ["note", noteId] });
    setEditMode(false);
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.preview}>
        {!editMode && (
          <button className={styles.editBtn} onClick={handleEdit} aria-label="Edit note">
            ✎
          </button>
        )}
        {editMode ? (
          <form onSubmit={handleEditSubmit}>
            <input
              className={styles.input}
              name="title"
              value={formState?.title ?? ""}
              onChange={handleEditChange}
              required
              minLength={3}
              maxLength={50}
              placeholder="Title"
            />
            <textarea
              className={styles.textarea}
              name="content"
              value={formState?.content ?? ""}
              onChange={handleEditChange}
              rows={6}
              maxLength={500}
              placeholder="Content"
            />
            <select
              className={styles.select}
              name="tag"
              value={formState?.tag ?? "Todo"}
              onChange={handleEditChange}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
            <div className={styles.actions}>
              <button type="button" className={styles.cancelButton} onClick={handleEditCancel}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className={styles.title}>{note.title}</h2>
            <p className={styles.content}>{note.content}</p>
            <div className={styles.meta}>
              <div className={styles.tags}>
                <span className={styles.tag}>{note.tag}</span>
              </div>
              <p className={styles.createdAt}>
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

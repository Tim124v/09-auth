"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useRouter } from "next/navigation";

interface NoteListProps {
  notes: Note[];
  tag: string;
}



function NoteList({ notes, tag }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  if (!notes.length) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <div className={css.footerLeft}>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <div className={css.footerRight}>
              <button
                className={css.link}
                onClick={() => router.push(`/notes/filter/${tag}/(.)notes/${note.id}`, { scroll: false })}
                style={{ marginRight: 8 }}
              >
                View details
              </button>
              <button
                onClick={() => handleDelete(note.id.toString())}
                className={css.button}
                disabled={
                  mutation.isPending &&
                  mutation.variables === note.id.toString()
                }
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

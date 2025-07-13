import axios from "axios";
import { Note, CreateNoteRequest } from "@/types/note";
import { logout } from "@/lib/api/clientApi";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query?: string,
  page: number = 1,
  tag?: string
): Promise<FetchNotesResponse> => {
  try {
    const params: { page: string; tag?: string; search?: string } = {
      page: page.toString(),
    };
    if (tag && tag !== "All") params.tag = tag;
    if (query && query.trim() !== "") params.search = query;
    const response = await api.get<FetchNotesResponse>("/api/notes", { params });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
      if (typeof window !== "undefined") {
        await logout();
        window.location.href = "/sign-in";
      }
    }
    throw new Error("Failed to fetch notes");
  }
};

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/api/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch note");
  }
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await api.post<Note>("/api/notes", note);
    return response.data;
  } catch {
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/api/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to delete note");
  }
}

export async function updateNote(id: string, note: Partial<CreateNoteRequest>): Promise<Note> {
  try {
    const response = await api.patch<Note>(`/api/notes/${id}`, note);
    return response.data;
  } catch {
    throw new Error("Failed to update note");
  }
}

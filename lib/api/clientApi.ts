import axios from "axios";
import { Note, CreateNoteRequest } from "@/types/note";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";

export const clientApi = axios.create({
  baseURL,
  withCredentials: true,
});

export async function login(email: string, password: string) {
  const response = await clientApi.post("/api/auth/login", { email, password });
  return response.data;
}

export async function logout() {
  await clientApi.post("/api/auth/logout");
}

export async function getSession() {
  const response = await clientApi.get("/api/auth/session");
  return response.data;
}

export async function register(email: string, password: string) {
  const response = await clientApi.post("/api/auth/register", { email, password });
  return response.data;
}

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
    const response = await clientApi.get<FetchNotesResponse>("/api/notes", { params });
    return response.data;
  } catch {
    throw new Error("Failed to fetch notes");
  }
};

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await clientApi.get<Note>(`/api/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch note");
  }
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await clientApi.post<Note>("/api/notes", note);
    return response.data;
  } catch {
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await clientApi.delete<Note>(`/api/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to delete note");
  }
}

export async function updateNote(id: string, note: Partial<CreateNoteRequest>): Promise<Note> {
  try {
    const response = await clientApi.patch<Note>(`/api/notes/${id}`, note);
    return response.data;
  } catch {
    throw new Error("Failed to update note");
  }
} 
import { Note, CreateNoteRequest } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export async function login(email: string, password: string): Promise<User> {
  const response = await api.post<User>("/auth/login", { email, password });
  return response.data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function getSession(): Promise<User> {
  const response = await api.get<User>("/auth/session");
  return response.data;
}

export async function register(email: string, password: string): Promise<User> {
  const response = await api.post<User>("/auth/register", { email, password });
  return response.data;
}

export async function updateUser(data: Partial<User>): Promise<User> {
  const response = await api.patch<User>("/users/me", data);
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
    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
  } catch {
    throw new Error("Failed to fetch notes");
  }
};

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch note");
  }
}

export async function createNote(note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", note);
    return response.data;
  } catch {
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to delete note");
  }
} 
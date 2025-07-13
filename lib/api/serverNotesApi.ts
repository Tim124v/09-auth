import { serverApi } from "./serverApi";
import { Note, CreateNoteRequest } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (
  cookieString: string,
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
    
    const response = await serverApi.get<FetchNotesResponse>("/notes", { 
      params,
      headers: {
        Cookie: cookieString,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Server fetchNotes error:", error);
    throw error instanceof Error ? error : new Error("Server fetchNotes error");
  }
};

export async function fetchNoteByIdServer(cookieString: string, id: string): Promise<Note> {
  try {
    const response = await serverApi.get<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookieString,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Server fetchNoteById error:", error);
    throw new Error("Failed to fetch note");
  }
}

export async function createNoteServer(cookieString: string, note: CreateNoteRequest): Promise<Note> {
  try {
    const response = await serverApi.post<Note>("/notes", note, {
      headers: {
        Cookie: cookieString,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Server createNote error:", error);
    throw new Error("Failed to create note");
  }
}

export async function deleteNoteServer(cookieString: string, id: string): Promise<Note> {
  try {
    const response = await serverApi.delete<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookieString,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Server deleteNote error:", error);
    throw new Error("Failed to delete note");
  }
} 
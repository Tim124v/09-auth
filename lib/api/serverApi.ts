import axios from 'axios';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import type { AxiosResponse } from 'axios';
import { Note } from '@/types/note';

const baseURL = 'https://notehub-api.goit.study';

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
}); 

export async function loginServer(email: string, password: string): Promise<User> {
  const cookieStore = await cookies();
  const response = await serverApi.post<User>('/auth/login', { email, password }, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function logoutServer(): Promise<void> {
  const cookieStore = await cookies();
  await serverApi.post('/auth/logout', {}, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}

export async function registerServer(email: string, password: string): Promise<User> {
  const cookieStore = await cookies();
  const response = await serverApi.post<User>('/auth/register', { email, password }, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getSessionServer(): Promise<AxiosResponse<User> | null> {
  const cookieStore = await cookies();
  try {
    const response = await serverApi.get<User>('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response;
  } catch {
    return null;
  }
}

export async function getUserServer(): Promise<User> {
  const cookieStore = await cookies();
  const response = await serverApi.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function updateUserServer(data: Partial<User>): Promise<User> {
  const cookieStore = await cookies();
  const response = await serverApi.patch<User>('/users/me', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
} 
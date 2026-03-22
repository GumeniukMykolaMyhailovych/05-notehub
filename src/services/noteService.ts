import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;
  return config;
});

// 📌 тип відповіді для списку
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// 📌 GET notes
export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await instance.get("/notes", {
      params: { page, perPage: 12, search },
    });

  return response.data;
};

// 📌 POST note
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post(
    "/notes",
    note
  );

  return response.data;
};

// 📌 DELETE note
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(
    `/notes/${id}`
  );

  return response.data;
};
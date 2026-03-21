import axios from "axios";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;
  return config;
});

export const fetchNotes = async (page: number, search: string) => {
  const { data } = await instance.get("/notes", {
    params: { page, perPage: 12, search },
  });
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await instance.delete(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await instance.post("/notes", note);
  return data;
};
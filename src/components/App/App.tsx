import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote } from "../../services/noteService";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpen(false);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* 🔍 SEARCH */}
        <SearchBox onSearch={debouncedSearch} />

        {/* 🔥 ЦЕНТР */}
        {data && data.totalPages > 1 && (
          <div className={css.center}>
            <Pagination
              pageCount={data.totalPages}
              onPageChange={setPage}
              currentPage={page}
            />
          </div>
        )}

        {/* ➕ BUTTON */}
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {/* 📦 LIST */}
      {data?.notes?.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {/* 🪟 MODAL */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onSubmit={(values) => createMutation.mutate(values)}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
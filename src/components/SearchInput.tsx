import { ChangeEvent, useState } from "react";

interface SearchInputProps {
  doSearch: (searchText: string) => void;
  clearSearch: () => void
}

export default function SearchInput(props: SearchInputProps) {
  const { doSearch, clearSearch } = props;
  const [text, setText] = useState("");
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
    doSearch(event.target.value);
  }
  function handleClearSearch() {
    setText("")
    clearSearch()
  }
  return (
    <div className="search-input search-input__container">
      <label htmlFor="searchInput">🔎</label>
      <input
        id="searchInput"
        type="text"
        placeholder="Search"
        value={text}
        onChange={handleOnChange}
      />
      {text.trim().length >= 1 && (
        <button type="button" onClick={handleClearSearch}>
          ✖️
        </button>
      )}
    </div>
  );
}

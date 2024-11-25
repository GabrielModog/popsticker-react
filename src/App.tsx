import { useContext } from "react";

import { StickersContext } from "./contexts/StickersContext";
import Sidebar from "./components/Sidebar";

import CardList from "./components/CardList";
import SearchInput from "./components/SearchInput";

function App() {
  const { stickers, searchForCard, clearSearch } = useContext(StickersContext);

  return (
    <main className="main-section">
      <div className="main-section__container">
        <Sidebar />
        <section className="main-section__content">
          <SearchInput doSearch={searchForCard} clearSearch={clearSearch} />
          {!stickers.list ||
            (stickers.list.length === 0 && (
              <h3 className="empty-list-title">Nothing here yet...</h3>
            ))}
          <CardList list={stickers.list} />
        </section>
      </div>
    </main>
  );
}

export default App;

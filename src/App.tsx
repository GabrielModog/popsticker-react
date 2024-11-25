import { useContext } from "react";

import { StickersContext } from "./contexts/StickersContext";
import Sidebar from "./components/Sidebar";

import CardList from "./components/CardList";

function App() {
  const { stickers } = useContext(StickersContext);
  // console.log(stickers.list);
  return (
    <main className="main-section">
      <div className="main-section__container">
        <Sidebar />
        <section className="main-section__content">
          <CardList
            list={stickers.list}
          />
        </section>
      </div>
    </main>
  );
}

export default App;

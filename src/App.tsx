import { useContext } from "react";

import { StickersContext } from "./contexts/StickersContext";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";

function App() {
  const { stickers } = useContext(StickersContext);
  console.log(stickers.list);
  return (
    <section className="main-section">
      <div className="container">
        <main className="main-section__content">
          <Sidebar />
          <div className="cards-section">
            {!stickers.list ||
              (stickers.list.length === 0 && <h3 className="empty-list-title">Nothing here yet...</h3>)}
            {stickers.list &&
              stickers.list.map((item: any) => (
                <Card
                  key={item.id}
                  content={item.text}
                  color={item.color}
                  id={item.id}
                />
              ))}
          </div>
        </main>
      </div>
    </section>
  );
}

export default App;

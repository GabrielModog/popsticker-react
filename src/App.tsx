import { useContext } from "react";

import { StickersContext } from "./contexts/StickersContext";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";

function App() {
  const { stickers } = useContext(StickersContext);
  console.log(stickers.list);
  return (
    <section className="container main-section">
      <Sidebar />
      <main className="cards-section">
        {stickers.list &&
          stickers.list.map((item: any) => (
            <Card
              key={item.id}
              content={item.text}
              color={item.color}
              id={item.id}
            />
          ))}
      </main>
    </section>
  );
}

export default App;

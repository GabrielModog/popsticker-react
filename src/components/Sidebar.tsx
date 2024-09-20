import { useContext } from "react";
import { StickersContext } from "../contexts/StickersContext";

const colors = ["blue", "red", "yellow", "green", "black"];

interface AddStickerButtonProps {
  onClick: () => void;
}

function AddStickerButton(props: AddStickerButtonProps) {
  const { onClick } = props;
  return <button type="button" className="sticker-button" onClick={onClick} />;
}

export default function Sidebar() {
  const { addSticker } = useContext(StickersContext);
  return (
    <aside className="sidebar">
      <h3>
        Pop
        <br />
        Sticker.
      </h3>

      <div className="sticker-button__list">
        {colors.map((color) => (
          <AddStickerButton
            key={color}
            onClick={() => {
              addSticker({
                text: "<insert_text_here>",
                color: color,
              });
            }}
          />
        ))}
      </div>
    </aside>
  );
}

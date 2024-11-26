import { useContext } from "react";
import { StickersContext } from "../contexts/StickersContext";
import { appendClasses } from "../utils/classes";

const colors = ["blue", "green", "yellow", "orange", "red", "black"];

interface AddStickerButtonProps {
  color: string;
  onClick: () => void;
}

function AddStickerButton(props: AddStickerButtonProps) {
  const { color, onClick } = props;
  return (
    <button
      type="button"
      className={appendClasses(
        "sticker-button",
        `sticker-button__${color}`
      )}
      onClick={onClick}
    />
  );
}

export default function Sidebar() {
  const { addSticker } = useContext(StickersContext);

  function handleAddSticker(color: string){
    addSticker({
      text: "<click_to_edit>",
      color: color,
      selected: false,
    });
  }

  return (
    <nav className="sidebar">
      <h3>
        Pop
        <br />
        Sticker.
      </h3>

      <div className="sticker-button__list">
        {colors.map((color) => (
          <AddStickerButton
            key={color}
            color={color}
            onClick={() => handleAddSticker(color)}
          />
        ))}
      </div>
    </nav>
  );
}

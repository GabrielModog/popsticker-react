import { useContext } from "react";
import { StickersContext } from "../contexts/StickersContext";

interface AddStickerButtonProps {
  onClick: () => void;
}

function AddStickerButton(props: AddStickerButtonProps) {
  const { onClick } = props;
  return (
    <button type="button" className="add-button" onClick={onClick}>
      +
    </button>
  );
}

export default function Sidebar() {
  const { addSticker } = useContext(StickersContext)
  return (
    <aside className="sidebar">
      <h3>Pop<br/>Sticker.</h3>
      <AddStickerButton onClick={() => {
        addSticker({
          text: "wefwefwefwefwf",
          color: "blue"
        })
      }} />
    </aside>
  );
}

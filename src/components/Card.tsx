import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { StickersContext } from "../contexts/StickersContext";
import { appendClasses } from "../utils/classes";

interface CardProps {
  id: string;
  content: string;
  color: string;
}

export default function Card(props: CardProps) {
  const { id, content, color } = props;
  const { changeSticker, removeSticker } = useContext(StickersContext);

  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState(content);

  function onTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextContent(event.target.value);
  }

  function handleOnClick() {
    setIsEditing(true);
  }

  function exitEditing() {
    setTextContent(content);
    setIsEditing(false);
  }

  function deleteSticker() {
    removeSticker(id);
  }

  function saveSticker() {
    changeSticker({
      id,
      sticker: {
        text: textContent,
        color: "blue",
      },
    });
  }

  function handleKeydown(event: KeyboardEvent<HTMLTextAreaElement>) {
    event.stopPropagation();
    if (event.key === "Enter") return saveSticker();

    if (event.key === "Delete") return deleteSticker();

    if (event.key === "Escape") return exitEditing();
  }

  if (isEditing) {
    return (
      <div className={appendClasses("card", `card__${color}`)}>
        <textarea
          value={textContent}
          onKeyDown={handleKeydown}
          onChange={onTextareaChange}
        />
        <div className="card__actions">
          <button type="button" onClick={deleteSticker}>
            delete
          </button>
          <button type="button" onClick={exitEditing}>
            cancel
          </button>
          <button type="button" onClick={saveSticker}>
            save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={appendClasses("card", `card__${color}`)}
      onClick={handleOnClick}
    >
      <p className="card__content">{content}</p>
    </div>
  );
}

import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { StickersContext } from "../contexts/StickersContext";
import { appendClasses } from "../utils/classes";

import AddIcon from "../assets/save.svg";
import DeleteIcon from "../assets/trash.svg";
import CancelIcon from "../assets/x.svg";

interface CardProps {
  id: string;
  content: string;
  color: string;
  selected: boolean
}

export default function Card(props: CardProps) {
  const { id, content, color, selected } = props;
  const { selectSticker, changeSticker, removeSticker } = useContext(StickersContext);

  const [textContent, setTextContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function onTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextContent(event.target.value);
  }

  function handleOnClick() {
    selectSticker(id)
  }

  function exitEditing() {
    setTextContent(content);
    selectSticker(null)
  }

  function deleteSticker() {
    removeSticker(id);
  }

  function saveSticker() {
    changeSticker({
      id,
      sticker: {
        id,
        text: textContent,
        color,
      },
    });
  }

  function handleKeydown(event: KeyboardEvent<HTMLTextAreaElement>) {
    event.stopPropagation();
    if (event.key === "Enter") return saveSticker();

    if (event.key === "Delete") return deleteSticker();

    if (event.key === "Escape") return exitEditing();
  }

  useEffect(() => {
    if(selected) {
      textareaRef.current?.focus()
    }
  }, [selected])

  if (selected) {
    return (
      <div
        onBlur={saveSticker}
        className={
        appendClasses(
          "card card-default",
          `sticker-border__${color}`
        )
      }>
        <textarea
          ref={textareaRef}
          value={textContent}
          onKeyDown={handleKeydown}
          onChange={onTextareaChange}
          onFocus={(e) => e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length,
          )}
        />
        <div className="card__actions">
          <button type="button" onClick={deleteSticker}>
            <img src={DeleteIcon} alt="delete action" />
          </button>
          <button type="button" onClick={exitEditing}>
            <img src={CancelIcon} alt="delete action" />
          </button>
          <button type="button" onClick={saveSticker}>
            <img src={AddIcon} alt="delete action" />
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

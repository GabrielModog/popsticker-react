import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StickersContext } from "../contexts/StickersContext";
import { appendClasses } from "../utils/classes";

import AddIcon from "../assets/save.svg";
import DeleteIcon from "../assets/trash.svg";
import CancelIcon from "../assets/x.svg";
import Tooltip from "./Tooltip";
import { StickerItem } from "../types";

type CardProps = StickerItem

export default function Card(props: CardProps) {
  const { id, text, color, selected } = props;
  const { selectSticker, changeSticker, removeSticker } =
    useContext(StickersContext);

  const cardRef = useRef<HTMLDivElement | null>(null)

  const [textContent, setTextContent] = useState(text);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function onTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length >= 90) return
    setTextContent(event.target.value);
  }

  function handleOnClick() {
    selectSticker(id);
  }

  function exitEditing() {
    setTextContent(textContent);
    selectSticker(null);
  }

  function deleteSticker() {
    cardRef.current?.classList.add("card__closing")
    setTimeout(() => {
      removeSticker(id);
      cardRef.current?.classList.remove("card__closing")
    }, 300)
  }

  function clearStickerContent() {
    changeSticker({
      id,
      sticker: {
        id,
        text: "",
        color,
      },
    });
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

    // const isFocused = document.activeElement === textareaRef.current

    if (event.key === "Enter") return saveSticker();

    if (event.key === "Delete") return deleteSticker();

    if (event.key === "Escape") return exitEditing();
  }

  function handleOnBlur(event: FocusEvent<HTMLTextAreaElement>) {
    if (event.relatedTarget?.closest(".card__actions button")) return;
    saveSticker();
  }

  useEffect(() => {
    if (selected) {
      textareaRef.current?.focus();
    }
  }, [selected]);

  //useEffect(() => {
  //  let timeout = setTimeout(() => {
  //    setTextContent("");
  //    clearStickerContent()
  //  }, 400);
  //  return () => {
  //    clearTimeout(timeout);
  //  }
  //}, []);

  if (selected) {
    return (
      <div
        id="card-item"
        ref={cardRef}
        className={appendClasses(
          "card card-default",
          `sticker-border__${color}`
        )}
      >
        <textarea
          id="card-textarea"
          ref={textareaRef}
          onBlur={handleOnBlur}
          value={textContent}
          onKeyDown={handleKeydown}
          onChange={onTextareaChange}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
        />
        <div className="card__actions">
          <Tooltip text="Deletar [delete]">
            <button type="button" onClick={deleteSticker}>
              <img src={DeleteIcon} alt="delete action" />
            </button>
          </Tooltip>
          <Tooltip text="Cancel [esc]">
            <button type="button" onClick={exitEditing}>
              <img src={CancelIcon} alt="delete action" />
            </button>
          </Tooltip>
          <Tooltip text="Save [enter]">
            <button type="button" onClick={saveSticker}>
              <img src={AddIcon} alt="delete action" />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      ref={cardRef}
      className={appendClasses("card", `card__${color} card__appear`)}
      onClick={handleOnClick}
    >
      <p className="card__content">{textContent}</p>
    </div>
  );
}

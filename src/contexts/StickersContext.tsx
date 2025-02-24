/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo, useReducer, useState } from "react";
import { StickerItem } from "../types";

export const StickersContext = createContext<any>(null);

type StickerState = {
  list: StickerItem[];
};

type StickerAction =
  | { type: "set_list"; payload: StickerItem[] }
  | { type: "select_sticker"; payload: string }
  | { type: "add_to_list"; payload: StickerItem }
  | { type: "change_sticker"; payload: { id: string, sticker: StickerItem } }
  | { type: "remove_from_list"; payload: string }
  | {
      type: "change_color";
      payload: {
        color: string;
        id: string;
      };
    };

const stickersReducer = (
  state: StickerState,
  action: StickerAction
): StickerState => {
  switch (action.type) {
    case "set_list":
      return {
        list: action.payload,
      };
    case "select_sticker":
      return {
        list: state.list.map((sticker) => {
          if (sticker.id === action.payload)
            return {
              ...sticker,
              selected: true,
            };
          return { ...sticker, selected: false };
        }),
      };
    case "add_to_list":
      return {
        list: [...state.list, action.payload],
      };
    case "change_sticker":
      return {
        list: state.list.map((sticker) => {
          if (sticker.id === action.payload.id) return action.payload.sticker;
          return sticker;
        }),
      };
    case "remove_from_list":
      return {
        list: state.list.filter((sticker) => sticker.id !== action.payload),
      };
    case "change_color":
      return {
        list: state.list.map((sticker) => {
          if (sticker.id === action.payload.id)
            return { ...sticker, color: action.payload.color };
          return sticker;
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  list: [],
  selectedSticker: null,
};

interface StickersProviderProps {
  children: React.ReactNode | React.ReactElement | React.ReactPortal | null | undefined
}

export function StickersProvider({ children }: StickersProviderProps) {
  const [state, dispatch] = useReducer(stickersReducer, initialState);
  const [temp, setTemp] = useState<StickerItem[]>([]);

  function addSticker(sticker: StickerItem) {
    dispatch({
      type: "add_to_list",
      payload: Object.assign(sticker, {
        // never do this in production!
        id: Math.random().toString(16).substring(2, 15),
      }),
    });
  }

  function removeSticker(id: string) {
    dispatch({
      type: "remove_from_list",
      payload: id,
    });
  }

  function changeStickerColor({ id, color }: { id: string, color: string }) {
    dispatch({
      type: "change_color",
      payload: {
        id,
        color,
      },
    });
  }

  function changeSticker({ id, sticker }: {id: string, sticker: StickerItem }) {
    dispatch({
      type: "change_sticker",
      payload: { id, sticker },
    });
  }
  
  function toogleStickerSelection(sticker: StickerItem) {
    changeSticker({id: sticker.id, sticker: {...sticker, selected: !sticker.selected}})  
  }

  function selectSticker(id: string) {
    dispatch({
      type: "select_sticker",
      payload: id,
    });
  }

  function searchForCard(searchText: string) {
    if (temp.length === 0) {
      setTemp(state.list);
    }

    const filtered = state.list.filter(
      (item) =>
        item.id.includes(searchText) ||
        item.text.includes(searchText) ||
        item.color.includes(searchText)
    );

    dispatch({
      type: "set_list",
      payload: filtered,
    });
  }

  function clearSearch() {
    dispatch({
      type: "set_list",
      payload: temp,
    });
  }

  const contextValue: any = useMemo(
    () => ({
      stickers: state,
      addSticker,
      removeSticker,
      changeSticker,
      changeStickerColor,
      selectSticker,
      searchForCard,
      clearSearch,
      toogleStickerSelection,
    }),
    [state]
  );

  return (
    <StickersContext.Provider value={contextValue}>
      {children}
    </StickersContext.Provider>
  );
}

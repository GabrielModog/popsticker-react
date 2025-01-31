/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo, useReducer, useState } from "react";

export const StickersContext = createContext<any>(null);

type StickerState = {
  list: any[];
};

type StickerAction =
  | { type: "set_list"; payload: any }
  | { type: "select_sticker"; payload: any }
  | { type: "add_to_list"; payload: any }
  | { type: "change_sticker"; payload: any }
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

export function StickersProvider({ children }: any) {
  const [state, dispatch] = useReducer(stickersReducer, initialState);
  const [temp, setTemp] = useState<any[]>([]);

  function addSticker(sticker: any) {
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

  function changeStickerColor({ id, color }: any) {
    dispatch({
      type: "change_color",
      payload: {
        id,
        color,
      },
    });
  }

  function changeSticker({ id, sticker }: any) {
    dispatch({
      type: "change_sticker",
      payload: { id, sticker },
    });
  }
  
  function toogleStickerSelection(sticker) {
    changeSticker({id: sticker.id, sticker: {...sticker, selected: !sticker.selected}})  
  }

  function selectSticker(id: any) {
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

import create from "zustand";

const initialState = {
  items: [],
};

export const useStore = create((set, get) => {
  return Object.assign(initialState, {
    items: [],
    addItem(text) {
      const items = get().items;
      set({ items: [...items, { text, id: Math.random() }] });
    },
  });
});

export function useReset() {
  useStore.setState(initialState);
}

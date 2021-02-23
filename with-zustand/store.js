import create from "zustand";

const initialState = {
  items: [],
};

const [useStore, api] = create((set, get) => {
  return Object.assign(initialState, {
    items: [],
    addItem(text) {
      const items = get().items;
      set({ items: [...items, { text, id: Math.random() }] });
    },
  });
});

export function useReset() {
  api.setState(initialState);
}

export { useStore, api };

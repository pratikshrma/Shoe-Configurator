import { create } from "zustand";

export const useStore = create((set) => ({
    color: '#ff0000',
    setColor: (color_input) => {
        return set({ color: color_input })
    },

    selectedMaterialKey: null,
    setSelectedMaterialKey: (key) => {
        return set({ selectedMaterialKey: key })
    },

    hoverMaterialKey: 'Hello',
    setHoverMaterialKey: (key) => {
        return set({ hoverMaterialKey: key })
    }

}))


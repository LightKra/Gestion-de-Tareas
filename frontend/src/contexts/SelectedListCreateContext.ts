import { createContext } from "react";

export interface SelectedListContextType {
  selectedListId: number | null;
  setSelectedListId: (id: number | null) => void;
}

export const SelectedListContext = createContext<SelectedListContextType | undefined>(
  undefined
);


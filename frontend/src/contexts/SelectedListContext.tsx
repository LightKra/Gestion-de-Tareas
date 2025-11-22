import { useState, type ReactNode } from "react";
import { SelectedListContext } from "./SelectedListCreateContext";

interface SelectedListProviderProps {
  children: ReactNode;
}

export function SelectedListProvider({ children }: SelectedListProviderProps) {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  return (
    <SelectedListContext.Provider value={{ selectedListId, setSelectedListId }}>
      {children}
    </SelectedListContext.Provider>
  );
}

import { useContext } from "react";
import { SelectedListContext } from "./SelectedListCreateContext";

export function useSelectedList() {
  const context = useContext(SelectedListContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
}


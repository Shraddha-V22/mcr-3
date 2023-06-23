import { createContext } from "react";
import { useContext } from "react";
import { snackReducer } from "../reducers/snackReducers";
import { snacks } from "../data/snacks";
import { useReducer } from "react";

const SnackContext = createContext();

const initialData = {
  data: [...snacks],
  filteredData: [...snacks],
  sortBy: "default",
  sortOrder: "reset",
  searchText: "",
};

export default function SnackProvider({ children }) {
  const [snacksData, dispatch] = useReducer(snackReducer, initialData);
  return (
    <SnackContext.Provider value={{ snacksData, dispatch }}>
      {children}
    </SnackContext.Provider>
  );
}

export const useSnacks = () => useContext(SnackContext);

import { sortString } from "../utils";

export const snackReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT_SNACKS":
      state = {
        ...state,
        sortBy: payload.name,
        sortOrder: payload.value,
      };
      break;
    case "SEARCH":
      state = {
        ...state,
        searchText: payload,
      };
      break;

    default:
      break;
  }

  if (state.sortBy !== "default") {
    state = {
      ...state,
      filteredData:
        state.sortOrder === "htl"
          ? [...state.data].sort((a, b) => a[state.sortBy] - b[state.sortBy])
          : state.sortOrder === "lth"
          ? [...state.data].sort((a, b) => b[state.sortBy] - a[state.sortBy])
          : state.data,
    };
  } else {
    state = {
      state,
      filteredData: state.data,
    };
  }

  if (state.sortBy === "product_name") {
    state = {
      ...state,
      filteredData:
        state.sortOrder === "htl"
          ? [...state.filteredData].sort((a, b) =>
              sortString(a[state.sortBy], b[state.sortBy])
            )
          : state.sortOrder === "lth"
          ? [...state.filteredData].sort((a, b) =>
              sortString(b[state.sortBy], a[state.sortBy])
            )
          : state.filteredData,
    };
  }
  if (state.sortBy === "ingredients") {
    state = {
      ...state,
      filteredData:
        state.sortOrder === "htl"
          ? [...state.filteredData].sort((a, b) =>
              sortString(a[state.sortBy][0], b[state.sortBy][0])
            )
          : state.sortOrder === "lth"
          ? [...state.filteredData].sort((a, b) =>
              sortString(b[state.sortBy][0], a[state.sortBy][0])
            )
          : state.filteredData,
    };
  }

  if (state.searchText) {
    state = {
      ...state,
      filteredData: state.filteredData.filter(
        ({ product_name, ingredients }) =>
          product_name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          ingredients
            .join(",")
            .toLowerCase()
            .includes(state.searchText.toLowerCase())
      ),
    };
  } else {
    state = {
      ...state,
      filteredData: state.filteredData,
    };
  }

  return state;
};

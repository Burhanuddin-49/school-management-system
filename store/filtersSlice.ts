import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  level: string;
  year: string;
  division: string;
}

const initialState: FiltersState = {
  level: "Primary",
  year: "",
  division: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state: any, action: PayloadAction<Partial<FiltersState>>) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => initialState,
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

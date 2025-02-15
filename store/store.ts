import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

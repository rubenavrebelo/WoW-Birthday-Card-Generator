import { configureStore } from "@reduxjs/toolkit";
import reducer from "../redux/reducer";

export const store = configureStore({
  reducer: {
    state: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

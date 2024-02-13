import { Actions ,ThunkAction, configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

export const reduxStore = configureStore({
  reducer,
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector : TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
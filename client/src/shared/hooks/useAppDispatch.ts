import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import store from "@shared/store";
import type RootState from "@shared/store";

type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export const useAppDispatch = () => store.dispatch as NextThunkDispatch;

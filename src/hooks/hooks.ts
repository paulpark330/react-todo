import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/index";

export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For useSelector, it saves you the need to type (state: RootState) every time

// For useDispatch, the default Dispatch type does not know about thunks or other middleware. In order to correctly dispatch thunks, you need to use the specific customized AppDispatch type from the store that includes the thunk middleware types, and use that with useDispatch. Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.

import { useSelector, useDispatch } from "react-redux";
import type { RootState, CartDispatch } from ".";

export const useCartDispatch = useDispatch.withTypes<CartDispatch>();
export const useCartSelector = useSelector.withTypes<RootState>();

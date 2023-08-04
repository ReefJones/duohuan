import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../redux/store";

// 重写 useSelector 实现组件复用
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

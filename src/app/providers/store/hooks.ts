import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  type TypedUseSelectorHook,
} from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

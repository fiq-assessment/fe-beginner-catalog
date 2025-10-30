import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import scenarioReducer from './slices/scenario.slice';

// EXPECTATION: Add more slices if needed. Keep state minimal; use RTK Query or TanStack Query in real apps.
// NOTE: This assignment focuses on Redux for filters and view state; cache data via local component or RTK Query if desired.

export const store = configureStore({
  reducer: {
    scenario: scenarioReducer,
  },
  // middleware: (getDefault) => getDefault(), // keep defaults for simplicity
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


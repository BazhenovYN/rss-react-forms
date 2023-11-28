import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import complexFormSlice from '@/store/complexFormSlice';
import countriesReducer from '@/store/countriesSlice';
import simpleFormReducer from '@/store/simpleFormSlice';

export const store = configureStore({
  reducer: {
    simpleForm: simpleFormReducer,
    complexForm: complexFormSlice,
    countries: countriesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

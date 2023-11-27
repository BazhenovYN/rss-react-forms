import { configureStore } from '@reduxjs/toolkit';
import formReducer from '@/store/formSlice';
import countriesReducer from '@/store/countriesSlice';

export const store = configureStore({
  reducer: {
    simpleForm: formReducer,
    complexForm: formReducer,
    countries: countriesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

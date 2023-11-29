import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IStoreData } from '@/types';

export interface IFormState {
  formData: IStoreData | null;
}

const initialState: IFormState = {
  formData: null,
};

export const complexFormSlice = createSlice({
  name: 'complexForm',
  initialState,
  reducers: {
    setComplexFormData: (state, action: PayloadAction<IStoreData>) => {
      state.formData = action.payload;
    },
  },
});

export const { setComplexFormData } = complexFormSlice.actions;

export const selectComplexFormData = (state: RootState) =>
  state.complexForm.formData;

export default complexFormSlice.reducer;

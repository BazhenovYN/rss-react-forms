import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IForm } from '@/types';

export interface IFormState {
  formData: IForm | null;
}

const initialState: IFormState = {
  formData: null,
};

export const complexFormSlice = createSlice({
  name: 'complexForm',
  initialState,
  reducers: {
    setComplexFormData: (state, action: PayloadAction<IForm>) => {
      state.formData = action.payload;
    },
  },
});

export const { setComplexFormData } = complexFormSlice.actions;

export const selectComplexFormData = (state: RootState) =>
  state.complexForm.formData;

export default complexFormSlice.reducer;

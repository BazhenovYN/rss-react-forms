import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IForm } from '@/types';

export interface IFormState {
  formData: IForm | null;
}

const initialState: IFormState = {
  formData: null,
};

export const searchSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<IForm>) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = searchSlice.actions;

export const selectSimpleFormData = (state: RootState) =>
  state.simpleForm.formData;
export const selectComplexFormData = (state: RootState) =>
  state.complexForm.formData;

export default searchSlice.reducer;

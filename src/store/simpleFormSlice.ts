import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IStoreData } from '@/types';

export interface IFormState {
  formData: IStoreData | null;
}

const initialState: IFormState = {
  formData: null,
};

export const simpleFormSlice = createSlice({
  name: 'simpleForm',
  initialState,
  reducers: {
    setSimpleFormData: (state, action: PayloadAction<IStoreData>) => {
      state.formData = action.payload;
    },
  },
});

export const { setSimpleFormData } = simpleFormSlice.actions;

export const selectSimpleFormData = (state: RootState) =>
  state.simpleForm.formData;

export default simpleFormSlice.reducer;

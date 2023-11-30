import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IFormData } from '@/types';

interface Record {
  creationDate: Date;
  formName: string;
  formData: IFormData;
}

interface IHistoryState {
  records: Record[];
}

const initialState: IHistoryState = {
  records: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveSimpleFormData: (state, action: PayloadAction<IFormData>) => {
      state.records.push({
        creationDate: new Date(),
        formName: 'simple',
        formData: action.payload,
      });
    },
    saveComplexFormData: (state, action: PayloadAction<IFormData>) => {
      state.records.push({
        creationDate: new Date(),
        formName: 'complex',
        formData: action.payload,
      });
    },
  },
});

export const { saveSimpleFormData, saveComplexFormData } = historySlice.actions;

export const selectHistoryRecords = (state: RootState) => state.history.records;

export default historySlice.reducer;

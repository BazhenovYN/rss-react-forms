import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { IFormData, LogData } from '@/types';

interface IHistoryState {
  records: LogData[];
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
        id: state.records.length + 1,
        creationDate: new Date().toJSON(),
        formName: 'simple',
        formData: action.payload,
      });
    },
    saveComplexFormData: (state, action: PayloadAction<IFormData>) => {
      state.records.push({
        id: state.records.length + 1,
        creationDate: new Date().toJSON(),
        formName: 'complex',
        formData: action.payload,
      });
    },
  },
});

export const { saveSimpleFormData, saveComplexFormData } = historySlice.actions;

export const selectHistoryRecords = (state: RootState) => state.history.records;

export default historySlice.reducer;

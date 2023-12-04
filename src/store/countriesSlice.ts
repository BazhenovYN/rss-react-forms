import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { countryList } from '@/constants/countries';

const initialState = {
  list: countryList,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries.list;

export default countriesSlice.reducer;

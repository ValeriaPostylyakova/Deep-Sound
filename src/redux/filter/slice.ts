import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types.ts';

const initialState: FilterState = {
    categoryIndex: 0,
    searchValue: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

export const { setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;

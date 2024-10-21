import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types.ts';

const initialState: FilterState = {
    categoryIndex: 0,
    searchValue: '',
    registrationUser: false,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setUser(state, action: PayloadAction<boolean>) {
            state.registrationUser = action.payload;
        },
    },
});

export const { reducer: filterReducer, actions: filterAction } = filterSlice;

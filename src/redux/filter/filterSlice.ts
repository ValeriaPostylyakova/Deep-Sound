import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types.ts';

const initialState: FilterState = {
    categoryIndex: 0,
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryIndex(state, action: PayloadAction<FilterState>) {
            state.categoryIndex = action.payload;
        },
    },
});

export const { setCategoryIndex } = filterSlice.actions;
export default filterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genres, GenresBlock } from './types.ts';

const initialState: GenresBlock = {
    genresBlock: [],
};

const blockSlice = createSlice({
    name: 'genresBlock',
    initialState,
    reducers: {
        setGenresBlock(state, action: PayloadAction<Genres>) {
            state.genresBlock = action.payload;
        },
    },
});

export const { setGenresBlock } = blockSlice.actions;
export default blockSlice.reducer;

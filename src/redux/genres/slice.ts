import { createSlice } from '@reduxjs/toolkit';
import { GenresState } from './types';
import { fetchGenres } from './asyncAction.ts';
import { Status } from '../songs/types.ts';

const initialState: GenresState = {
    genres: [],
    statusGenres: Status.LOADING,
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres(state, action) {
            state.genres = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchGenres.pending, (state) => {
            state.statusGenres = Status.LOADING;
        });

        builder.addCase(fetchGenres.fulfilled, (state, action) => {
            state.statusGenres = Status.SUCCESS;
            state.genres = action.payload;
        });

        builder.addCase(fetchGenres.rejected, (state) => {
            state.statusGenres = Status.ERROR;
        });
    },
});

export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;

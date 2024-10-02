import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genres, GenresState } from './types';
import { fetchGenres } from './asyncAction.ts';
import { Status } from '../songs/types.ts';

const initialState: GenresState = {
    genres: [],
    genre: [],
    genreId: 0,
    categoryId: 0,
    statusGenres: Status.LOADING,
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<Genres>) {
            state.genres = action.payload;
        },

        setGenreId(state, action: PayloadAction<number>) {
            state.genreId = action.payload;
        },

        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },

        setGenre(state, action: PayloadAction<Genres>) {
            state.genre = action.payload;
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

export const { setGenres, setGenreId, setGenre, setCategoryId } =
    genresSlice.actions;

export default genresSlice.reducer;

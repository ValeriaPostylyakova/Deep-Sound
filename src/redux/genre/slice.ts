import { GenreState } from './types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGenre } from './asyncAction.ts';
import { Status } from '../songs/types.ts';

const initialState: GenreState = {
    genre: [],
    genreId: 0,
    title: 'Поп',
    categoryId: 0,
    statusGenre: Status.LOADING,
};

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenreId(state, action: PayloadAction<number>) {
            state.genreId = action.payload;
        },

        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },

        setTitle(state, action: PayloadAction<string | undefined>) {
            if (action.payload) {
                state.title = action.payload;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchGenre.pending, (state) => {
            state.statusGenre = Status.LOADING;
        });

        builder.addCase(fetchGenre.fulfilled, (state, action) => {
            state.statusGenre = Status.SUCCESS;
            state.genre = action.payload;
        });

        builder.addCase(fetchGenre.rejected, (state) => {
            state.statusGenre = Status.ERROR;
        });
    },
});

export const { reducer: genreReducer, actions: genreAction } = genreSlice;

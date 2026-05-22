import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryArray, GenresState } from './types';
import { fetchGenres } from './asyncAction.ts';
import { Status } from '../songs/types.ts';

const initialState: GenresState = {
    genres: [],
    categoryArray: [
        { value: 'Все' },
        { value: 'Русская поп-музыка' },
        { value: 'Диско' },
    ],
    statusGenres: Status.LOADING,
};

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setCategoryArray(
            state,
            action: PayloadAction<CategoryArray[] | undefined>
        ) {
            if (action.payload) {
                state.categoryArray = action.payload;
            }
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

export const { reducer: genresReducer, actions: genresAction } = genresSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorite } from './AsyncAction.ts';
import { FavoriteAdd, FavoriteState } from './types.ts';
import { SongObj, Status } from '../songs/types.ts';

const initialState: FavoriteState = {
    status: Status.LOADING,
    favorite: [],
    blockFavorite: [],
    favoriteAdded: null,
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite(state, action: PayloadAction<SongObj>) {
            state.favorite.push(action.payload);
        },

        removeItem(state, action) {
            state.blockFavorite = state.blockFavorite.filter(
                (obj) => obj.id !== action.payload.id
            );
        },
        setFavoriteAdded(state, action: PayloadAction<FavoriteAdd>) {
            state.favoriteAdded = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchFavorite.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchFavorite.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.blockFavorite = action.payload;
        });

        builder.addCase(fetchFavorite.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { reducer: favoriteReducer, actions: favoriteAction } =
    favoriteSlice;

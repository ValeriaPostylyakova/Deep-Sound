import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorite } from './AsyncAction.ts';
import { FavoriteState } from './types.ts';
import { SongObj } from '../songs/types.ts';

const initialState: FavoriteState = {
    favorite: [],
    blockFavorite: [],
    favoriteActive: false,
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite(state, action: PayloadAction<SongObj>) {
            state.favorite.push(action.payload);
        },

        setBlockFavorite(state, action: PayloadAction<SongObj>) {
            state.blockFavorite = action.payload;
        },

        setFavoriteActive(state, action: PayloadAction<boolean>) {
            state.favoriteActive = action.payload;
        },

        removeItem(state, action) {
            state.blockFavorite = state.blockFavorite.filter(
                (obj) => obj.id !== action.payload.id
            );
        },
    },
});

export const { setFavorite, setBlockFavorite, setFavoriteActive, removeItem } =
    favoriteSlice.actions;

export default favoriteSlice.reducer;

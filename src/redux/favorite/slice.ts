import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteState } from './types.ts';
import { SongObj } from '../songs/types.ts';

const initialState: FavoriteState = {
    favorite: [],
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite(state, action: PayloadAction<SongObj>) {
            state.favorite = action.payload;
        },

        removeItem(state, action) {
            state.favorite = state.favorite.filter(
                (obj) => obj.id !== action.payload.id
            );
        },
    },
});

export const { setFavorite, removeItem } = favoriteSlice.actions;

export default favoriteSlice.reducer;

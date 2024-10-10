import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaylistState } from './types.ts';

const initialState: PlaylistState = {
    playlist: [],
    playerActive: false,
};

const playlistPlayerSlice = createSlice({
    name: 'playlistPlayer',
    initialState,
    reducers: {
        setPlayerActive(state, action: PayloadAction<boolean>) {
            state.playerActive = action.payload;
        },

        setPlaylist(state, action) {
            state.playlist = action.payload;
        },
    },
});

export const { reducer: playlistReducer, actions: playlistAction } =
    playlistPlayerSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, SongsState } from './types';
import { fetchSongs } from './asyncAction.ts';

export const initialState: SongsState = {
    status: Status.LOADING,
    songs: [],
    activePlayer: false,
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setClickPlay(state, action: PayloadAction<boolean>) {
            state.activePlayer = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSongs.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchSongs.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { setClickPlay } = songsSlice.actions;
export default songsSlice.reducer;

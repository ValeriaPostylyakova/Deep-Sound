import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongsState, Status } from './types';
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
            state.status = Status.SUCCESS;
            state.songs = action.payload;
        });

        builder.addCase(fetchSongs.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { reducer: songsReducer, actions: songsAction } = songsSlice;
// export default songsSlice.reducer;

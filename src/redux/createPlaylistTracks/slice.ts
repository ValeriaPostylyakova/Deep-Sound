import { Status } from '../songs/types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlaylistTracks } from './asyncAction.ts';
import { PlaylistTracksState } from './types.ts';

const initialState: PlaylistTracksState = {
    playlistTracks: [],
    status: Status.LOADING,
};

const playlistTracks = createSlice({
    name: 'customPlaylistTracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylistTracks.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchPlaylistTracks.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.playlistTracks = action.payload;
        });

        builder.addCase(fetchPlaylistTracks.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { reducer: playlistTracksReducer } = playlistTracks;

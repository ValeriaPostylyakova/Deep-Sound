import { SongObj, Status } from '../songs/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlaylistTracks } from './asyncAction.ts';
import { PlaylistTracksState } from './types.ts';
import axios from 'axios';

const initialState: PlaylistTracksState = {
    playlistTracks: [],
    activePlayer: false,
    activeBar: false,
    songId: 0,
    status: Status.LOADING,
};

const playlistTracks = createSlice({
    name: 'customPlaylistTracks',
    initialState,
    reducers: {
        setActivePlayer(state, action: PayloadAction<boolean>) {
            state.activePlayer = action.payload;
        },
        setRemoveTrack(state, action: PayloadAction<SongObj>) {
            state.playlistTracks = state.playlistTracks.filter(
                (obj) => obj.id !== action.payload.id
            );
            axios.delete(
                `https://985cc4acb156d262.mokky.dev/addSong/${action.payload.id}`
            );
        },
        setSongId(state, action: PayloadAction<SongObj>) {
            state.songId = action.payload.id;
        },
    },
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

export const {
    reducer: playlistTracksReducer,
    actions: playlistTracksActions,
} = playlistTracks;

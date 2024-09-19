import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status, SongObj, SongsState } from './types';
import axios from 'axios';

export const fetchSongs = createAsyncThunk<SongObj>(
    'songs/fetchSongsStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/sounds'
        );
        return data;
    }
);

const initialState: SongsState = {
    status: Status.LOADING,
    songs: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setClickPlay(state, action) {
            state.songs = action.payload;
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

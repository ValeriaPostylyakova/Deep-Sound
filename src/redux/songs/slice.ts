import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchSongs = createAsyncThunk(
    'songs/fetchSongsStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/sounds'
        );
        return data;
    }
);

const initialState = {
    status: 'success',
    songs: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setCategoryIndex(state, action) {
            state.categoryIndex = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSongs.pending, (state) => {
            state.status = 'success';
        });

        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
            state.status = 'success';
        });

        builder.addCase(fetchSongs.rejected, (state) => {
            state.status = 'success';
        });
    },
});

export default songsSlice.reducer;

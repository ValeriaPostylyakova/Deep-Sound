import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatePlaylistState } from './types.ts';
import { Status } from '../songs/types.ts';
import { fetchCustomPlaylists } from './asyncAction.ts';

const initialState: CreatePlaylistState = {
    inputValue: 'Новый плейлист',
    actionBarActive: false,
    customPlaylists: [],

    status: Status.LOADING,
};

const createPlaylist = createSlice({
    name: 'createPlaylist',
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        setActionBarActive(state, action: PayloadAction<boolean>) {
            state.actionBarActive = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCustomPlaylists.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchCustomPlaylists.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.customPlaylists = action.payload;
        });

        builder.addCase(fetchCustomPlaylists.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { setInputValue, setActionBarActive } = createPlaylist.actions;

export default createPlaylist.reducer;
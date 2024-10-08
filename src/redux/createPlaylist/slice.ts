import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatePlaylistState } from './types.ts';

const initialState: CreatePlaylistState = {
    inputValue: 'Новый плейлист',
    actionBarActive: false,
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
});

export const { setInputValue, setActionBarActive } = createPlaylist.actions;

export default createPlaylist.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, SongId, ObjCurrentTime } from './types.ts';

const initialState: PlayerState = {
    song: {
        id: 0,
    },
    play: false,
    loop: false,
    currentTime: { min: 0, sec: 0 },
    trackWidth: 0,
};

const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setSong(state, action: PayloadAction<SongId>) {
            state.song = action.payload;
        },

        setPlay(state, action: PayloadAction<boolean>) {
            state.play = action.payload;
        },

        setLoop(state, action: PayloadAction<boolean>) {
            state.loop = action.payload;
        },

        setCurrentTime(state, action: PayloadAction<ObjCurrentTime>) {
            state.currentTime = action.payload;
        },

        setTrackWidth(state, action: PayloadAction<number>) {
            state.trackWidth = action.payload;
        },
    },
});

export const { setSong, setPlay, setLoop, setCurrentTime, setTrackWidth } =
    PlayerSlice.actions;

export default PlayerSlice.reducer;

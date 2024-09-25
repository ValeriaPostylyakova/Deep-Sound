import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliderState, DataObj } from './types.ts';
import { ObjCurrentTime } from '../player/types.ts';

const initialState: SliderState = {
    activePlayerSlide: false,
    isPlay: false,
    dataSongs: [],
    slideFilterData: [],
    currentTime: { min: 0, sec: 0 },
    trackWidth: 0,
};

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setDataSongs(state, action: PayloadAction<DataObj>) {
            state.dataSongs = action.payload;
        },
        setSliderId(state, action: PayloadAction<DataObj>) {
            const findSlideObj = state.dataSongs.find(
                (obj: DataObj) => obj.id === action.payload.id
            );

            if (findSlideObj) {
                state.slideFilterData = findSlideObj.sliderSongs;
            }
        },

        setActivePlayerSlide(state, action: PayloadAction<boolean>) {
            state.activePlayerSlide = action.payload;
        },
        setIsPlay(state, action: PayloadAction<boolean>) {
            state.isPlay = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<ObjCurrentTime>) {
            state.currentTime = action.payload;
        },

        setTrackWidth(state, action: PayloadAction<number>) {
            state.trackWidth = action.payload;
        },
    },
});

export const {
    setDataSongs,
    setSliderId,
    setActivePlayerSlide,
    setIsPlay,
    setCurrentTime,
    setTrackWidth,
} = sliderSlice.actions;
export default sliderSlice.reducer;

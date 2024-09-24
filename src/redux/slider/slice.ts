import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliderState, DataObj } from './types.ts';

const initialState: SliderState = {
    activePlayerSlide: false,
    dataSongs: [],
    slideFilterData: [],
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
    },
});

export const { setDataSongs, setSliderId, setActivePlayerSlide } =
    sliderSlice.actions;
export default sliderSlice.reducer;

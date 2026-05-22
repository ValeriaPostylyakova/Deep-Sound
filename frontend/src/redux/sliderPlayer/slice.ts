import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliderState, DataObj } from './types.ts';
import { ObjCurrentTime } from '../player/types.ts';
import { Status } from '../songs/types.ts';
import { fetchSlider } from './asyncAction.ts';

const initialState: SliderState = {
    dataSongs: [],
    status: Status.LOADING,
    activePlayerSlide: false,
    slideActive: [],
    isPlay: false,
    slideFilterData: [],
    currentTime: { min: 0, sec: 0 },
    trackWidth: 0,
};

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setDataSongs(state, action: PayloadAction<DataObj[]>) {
            state.dataSongs = action.payload;
        },
        setSliderId(state, action: PayloadAction<DataObj>) {
            const findSlideObj = state.dataSongs.find(
                (obj: DataObj) => obj.id === action.payload.id
            );

            if (findSlideObj) {
                state.slideFilterData = findSlideObj.sliderSongs;
                state.slideActive = [{ ...findSlideObj }];
            }
        },

        setActivePlayerSlide(state, action: PayloadAction<boolean>) {
            state.activePlayerSlide = action.payload;
        },

        setCurrentTime(state, action: PayloadAction<ObjCurrentTime>) {
            state.currentTime = action.payload;
        },

        setTrackWidth(state, action: PayloadAction<number>) {
            state.trackWidth = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSlider.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchSlider.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.dataSongs = action.payload;
        });

        builder.addCase(fetchSlider.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { reducer: sliderReducer, actions: sliderAction } = sliderSlice;

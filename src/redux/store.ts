import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice.ts';
import songs from './songs/slice.ts';
import player from './player/slice.ts';
import slider from './sliderPlayer/slice.ts';
import favorite from './favorite/slice.ts';
import genres from './genres/slice.ts';

export const store = configureStore({
    reducer: {
        filter,
        songs,
        player,
        slider,
        favorite,
        genres,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

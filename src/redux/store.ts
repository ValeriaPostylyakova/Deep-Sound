import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice.ts';
import songs from './songs/slice.ts';
import player from './player/slice.ts';

export const store = configureStore({
    reducer: {
        filter,
        songs,
        player,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

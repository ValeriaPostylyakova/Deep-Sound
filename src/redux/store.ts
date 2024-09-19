import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/filterSlice.ts';
import songs from './songs/slice.ts';

export const store = configureStore({
    reducer: {
        filter,
        songs,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

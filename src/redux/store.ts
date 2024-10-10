import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filter/slice.ts';
import { songsReducer } from './songs/slice.ts';
import { playerReducer } from './player/slice.ts';
import { sliderReducer } from './sliderPlayer/slice.ts';
import { favoriteReducer } from './favorite/slice.ts';
import { genresReducer } from './genres/slice.ts';
import { genreReducer } from './genre/slice.ts';
import { playlistReducer } from './playlistPlayer/slice.ts';
import { collectionsReducer } from './collections/slice.ts';
import { collectionReducer } from './collection/slice.ts';
import { createPlaylistReducer } from './createPlaylist/slice.ts';

export const store = configureStore({
    reducer: {
        filterReducer,
        songsReducer,
        playerReducer,
        sliderReducer,
        favoriteReducer,
        genresReducer,
        genreReducer,
        playlistReducer,
        collectionsReducer,
        collectionReducer,
        createPlaylistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

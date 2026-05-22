import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaylistObj, GenreFetch } from './types.ts';
import axios from 'axios';

export const fetchGenre = createAsyncThunk<PlaylistObj[], GenreFetch>(
    'genre/fetchGenreStatus',
    async (params) => {
        const { genreId, categoryFilter } = params;
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/playlists?currentId=${genreId}&${categoryFilter}`
        );

        return data;
    }
);

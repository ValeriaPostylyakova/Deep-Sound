import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Genres } from './types';

export const fetchGenres = createAsyncThunk<Genres[]>(
    'genres/fetchGenresStatus',
    async () => {
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/genres`
        );
        return data;
    }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongObj } from '../songs/types.ts';
import axios from 'axios';

export const fetchFavorite = createAsyncThunk<SongObj[]>(
    'favorite/fetchFavoriteStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/favorite'
        );
        return data;
    }
);

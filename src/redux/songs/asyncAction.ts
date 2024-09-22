import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongObj } from './types.ts';
import axios from 'axios';

export const fetchSongs = createAsyncThunk<SongObj>(
    'songs/fetchSongsStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/sounds'
        );
        return data;
    }
);

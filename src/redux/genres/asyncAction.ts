import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DataObj } from '../sliderPlayer/types.ts';

export const fetchGenres = createAsyncThunk<DataObj>(
    'genres/fetchGenresStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/genres'
        );
        return data;
    }
);

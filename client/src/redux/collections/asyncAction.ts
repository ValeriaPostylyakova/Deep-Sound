import { createAsyncThunk } from '@reduxjs/toolkit';
import { Genres } from '../genres/types.ts';
import axios from 'axios';

export const fetchCollections = createAsyncThunk<Genres[]>(
    'collections/fetchCollectionsStatus',
    async () => {
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/collections`
        );
        return data;
    }
);

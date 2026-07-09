import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PlaylistObj } from '../genre/types.ts';

export const fetchCollection = createAsyncThunk<PlaylistObj[], number>(
    'collection/fetchCollectionsStatus',
    async (collectionId) => {
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/playlists2?currentId=${collectionId}`
        );
        return data;
    }
);

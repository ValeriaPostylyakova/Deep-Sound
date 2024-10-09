import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomPlaylistObj } from './types.ts';

import axios from 'axios';

export const fetchCustomPlaylists = createAsyncThunk<CustomPlaylistObj[]>(
    'customPlaylists/fetchPlaylistsStatus',
    async () => {
        const { data } = await axios.get(
            'https://985cc4acb156d262.mokky.dev/createPlaylist'
        );
        return data;
    }
);

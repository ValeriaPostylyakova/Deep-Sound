import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomPlaylistObj } from './types.ts';

import axios from 'axios';

export const fetchCustomPlaylists = createAsyncThunk<
    CustomPlaylistObj[],
    string
>('customPlaylists/fetchPlaylistsStatus', async (token) => {
    const { data } = await axios.get(
        'https://985cc4acb156d262.mokky.dev/createPlaylist',
        { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
});

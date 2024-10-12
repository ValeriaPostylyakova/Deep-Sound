import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongObj } from '../songs/types.ts';
import axios from 'axios';

export const fetchPlaylistTracks = createAsyncThunk<SongObj[], string>(
    'playlistTracks/fetchTracksStatus',
    async (id: string) => {
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/addSong?parentId=${id}`
        );
        return data;
    }
);

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

export const fetchDeleteFavorite = async (findObj: SongObj) => {
    try {
        await axios.delete(
            `https://985cc4acb156d262.mokky.dev/favorite/${findObj.currentId}`
        );
    } catch (err) {
        console.error(err);
        alert('Ошибка при удалении закладки');
    }
};

export async function fetchPostFavorite(objFavorite?: SongObj) {
    try {
        const { data } = await axios.post(
            `https://985cc4acb156d262.mokky.dev/favorite`,
            {
                ...objFavorite,
            }
        );
        return data;
    } catch (err) {
        console.error(err);
        alert('Ошибка при добавлении закладки');
    }
}

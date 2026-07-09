import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataObj } from './types.ts';
import axios from 'axios';

export const fetchSlider = createAsyncThunk<DataObj[]>(
    'slider/fetchSliderStatus',
    async () => {
        const { data } = await axios.get(
            `https://985cc4acb156d262.mokky.dev/slider`
        );
        return data;
    }
);

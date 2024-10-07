import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../songs/types.ts';
import { CollectionsState } from './types.ts';
import { fetchCollections } from './asyncAction.ts';

const initialState: CollectionsState = {
    collections: [],
    title: 'Хиты',
    status: Status.LOADING,
};

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string | undefined>) {
            state.title = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollections.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.collections = action.payload;
        });

        builder.addCase(fetchCollections.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { setTitle } = collectionsSlice.actions;

export default collectionsSlice.reducer;

import { Status } from '../songs/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCollection } from './asyncAction.ts';
import { CollectionState } from './types.ts';

const initialState: CollectionState = {
    playlists: [],
    collectionId: 0,
    status: Status.LOADING,
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setCollectionId(state, action: PayloadAction<number>) {
            state.collectionId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollection.pending, (state) => {
            state.status = Status.LOADING;
        });

        builder.addCase(fetchCollection.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.playlists = action.payload;
        });

        builder.addCase(fetchCollection.rejected, (state) => {
            state.status = Status.ERROR;
        });
    },
});

export const { setCollectionId } = collectionSlice.actions;

export default collectionSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../page/Registration.tsx';
import { RegisrationState } from './types.ts';

const initialState: RegisrationState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        id: 0,
    },
    userProfile: false,
};

const registrationSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<FormValues>) {
            state.user = action.payload;
        },
        setUserProfile(state, action: PayloadAction<boolean>) {
            state.userProfile = action.payload;
        },
    },
});

export const { reducer: profileReducer, actions: profileActions } =
    registrationSlice;

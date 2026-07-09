import { FetchData } from './getResponseStatus.ts';

export const getUser = () => {
    const user: FetchData = JSON.parse(localStorage.getItem('user') || '');
    return user;
}
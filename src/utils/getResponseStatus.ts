import { FormValues } from '../page/Registration.tsx';

type FetchData = {
    token: string;
    data: FormValues;
};

export type FetchResponse = {
    data: FetchData;
    status: number;
};

export const getResponseStatus = (response: FetchResponse) => {
    console.log(response.status);
    if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
};

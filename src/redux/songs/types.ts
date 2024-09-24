export interface SongsState {
    status: 'loading' | 'success' | 'error';
    songs: SongObj[];
    activePlayer: boolean;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type SongObj = {
    id: number;
    title: string;
    place: number;
    author: string;
    imageUrl: string;
    songUrl: string;
    time: string;
    key?: number;
};

export interface SongsState {
    status: string;
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
    currentId: number;
    title: string;
    place?: number;
    author: string;
    imageUrl: string;
    songUrl?: string;
    time: string;
    key?: number;
};

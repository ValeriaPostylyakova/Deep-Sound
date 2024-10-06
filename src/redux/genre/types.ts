import { SongObj, Status } from '../songs/types.ts';

export interface GenreState {
    genre: PlaylistObj[];
    genreId: number;
    title: string | undefined;
    categoryId: number;
    statusGenre: Status;
}

export type GenreFetch = {
    genreId: number;
    categoryFilter: string;
};

export type PlaylistObj = {
    id: number;
    title: string;
    imageUrl: string;
    category: number;
    songs: SongObj[];
};

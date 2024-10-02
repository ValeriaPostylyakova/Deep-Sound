import { SongObj, Status } from '../songs/types.ts';

export type PlaylistObj = {
    id: number;
    title: string;
    imageUrl: string;
    songs: SongObj[];
};

export type Genres = {
    id: number;
    imageUrl: string;
    linkUrl: string;
    playlists: PlaylistObj[];
};

export type GenresState = {
    genres: Genres[];
    genre: Genres[];
    statusGenres: Status;
    genreId: number;
    categoryId: number;
};

export interface GenresBlock {
    genresBlock: Genres[];
}

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
    statusGenres: Status;
};

export interface GenresBlock {
    genresBlock: Genres[];
}

import { Status } from '../songs/types.ts';
import { PlaylistObj } from '../genre/types.ts';

export type CategoryArray = {
    value: string;
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
    categoryArray: CategoryArray[];
};

export interface GenresBlock {
    genresBlock: Genres[];
}

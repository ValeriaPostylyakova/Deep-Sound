import { SongObj } from '../songs/types.ts';

export type FavoriteState = {
    favorite: SongObj[];
    blockFavorite: SongObj[];
    favoriteActive: boolean;
};

import { SongObj, Status } from '../songs/types.ts';

export type FavoriteAdd = {
    added: boolean;
    title: string;
};

export interface FavoriteState {
    favorite: SongObj[];
    blockFavorite: SongObj[];
    favoriteAdded: FavoriteAdd | null;
    status: Status;
}

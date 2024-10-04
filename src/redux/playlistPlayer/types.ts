import { SongObj } from '../songs/types.ts';

export type PlaylistState = {
    playlist: SongObj[];
    playerActive: boolean;
};

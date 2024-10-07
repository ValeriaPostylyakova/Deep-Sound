import { PlaylistObj } from '../genre/types.ts';
import { Status } from '../songs/types.ts';

export interface CollectionState {
    playlists: PlaylistObj[];
    collectionId: number;
    status: Status;
}

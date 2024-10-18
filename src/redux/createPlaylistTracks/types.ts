import { SongObj, Status } from '../songs/types.ts';

export type PlaylistTracksState = {
    playlistTracks: SongObj[];
    activeBar: boolean;
    activePlayer: boolean;
    songId: number;
    status: Status;
};

import { SongObj, Status } from '../songs/types.ts';

export type PlaylistTracksState = {
    playlistTracks: SongObj[];
    status: Status;
};

import { SongObj, Status } from '../songs/types.ts';

export interface CreatePlaylistState {
    customPlaylists: CustomPlaylistObj[];
    playlists: CustomPlaylistObj[];
    status: Status;
    parentId: string;
    inputValue: string;
    deletePlaylist: boolean;
    actionBarActive: boolean;
}

export type CustomPlaylistObj = {
    id: number;
    parentId: string;
    songs: SongObj[];
    title: string;
};

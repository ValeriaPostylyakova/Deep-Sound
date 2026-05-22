import { SongObj, Status } from '../songs/types.ts';

export interface CreatePlaylistState {
    inputValue: string;
    inputName: string;
    customPlaylists: CustomPlaylistObj[];
    playlists: CustomPlaylistObj[];
    status: Status;
    parentId: string;
    deletePlaylist: boolean | null;
    actionBarActive: boolean;
}

export type CustomPlaylistObj = {
    id: number;
    parentId: string;
    songs: SongObj[];
    title: string;
};

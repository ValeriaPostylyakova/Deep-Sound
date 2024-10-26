import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { SongObj } from '../redux/songs/types.ts';
import { fetchCustomPlaylists } from '../redux/createPlaylist/asyncAction.ts';

import CustomSongBlock from '../components/CustomPlaylists/CustomSongBlock.tsx';
import CreatePlaylist from '../components/createCustomBlocks/CreatePlaylist.tsx';
import DeletePlaylistModal from '../components/createCustomBlocks/DeletePlaylistModal.tsx';
import { getUser } from '../utils/getUser.ts';

const CreateCustomPlaylist = () => {
    const dispatch: AppDispatch = useDispatch();
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    React.useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const user = getUser();
            dispatch(fetchCustomPlaylists(user.token));
        }
    }, [dispatch]);

    const id = window.location.pathname.slice(28);
    const findObj = customPlaylists.find((obj) => obj.parentId === id);

    return (
        <div className="custom__wrapper">
            <CreatePlaylist findObj={findObj} />
            {playlistTracks.length > 0 && (
                <div className="bottom">
                    <div className="bottom__container">
                        <h1 className="custom__title">Треки</h1>
                        <div className="custom__container-songs">
                            {playlistTracks.map(
                                (song: SongObj, index: number) => (
                                    <CustomSongBlock {...song} key={index} />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
            <DeletePlaylistModal />
        </div>
    );
};

export default CreateCustomPlaylist;

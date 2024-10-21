import * as React from 'react';
import { Link } from 'react-router-dom';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { FaMusic } from 'react-icons/fa6';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomPlaylists } from '../../redux/createPlaylist/asyncAction.ts';

const PlaylistBlock: React.FC = () => {
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );

    const dispatch: AppDispatch = useDispatch();
    const playlists = useSelector(
        (state: RootState) => state.createPlaylistReducer.playlists
    );

    React.useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user') || '');
            dispatch(fetchCustomPlaylists(user.token));
        }
    }, [playlists]);

    return customPlaylists.map((playlist: CustomPlaylistObj) => (
        <Link key={playlist.id} to={`/custom-playlist/${playlist.parentId}`}>
            <div className="sidebar__playlist">
                <div className="sidebar__playlist-container">
                    <div className="sidebar__playlist-images">
                        <FaMusic className="sidebar__playlist-images_icon" />
                    </div>
                    <div className="sidebar__playlist_info">
                        <h3>{playlist.title}</h3>
                        {/*<h4>*/}
                        {/*    {playlistTracks.length <= 4*/}
                        {/*        ? playlistTracks.length + ' трека'*/}
                        {/*        : playlistTracks.length + ' треков'}*/}
                        {/*</h4>*/}
                    </div>
                </div>
            </div>
        </Link>
    ));
};

export default PlaylistBlock;

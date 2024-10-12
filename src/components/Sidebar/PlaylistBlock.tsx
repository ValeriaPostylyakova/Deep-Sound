import * as React from 'react';
import { Link } from 'react-router-dom';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { FaMusic } from 'react-icons/fa6';
import { fetchCustomPlaylists } from '../../redux/createPlaylist/asyncAction.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

const PlaylistBlock: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );
    const playlists = useSelector(
        (state: RootState) => state.createPlaylistReducer.playlists
    );

    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    React.useEffect(() => {
        dispatch(fetchCustomPlaylists());
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
                        <h4>
                            {playlistTracks.length <= 4
                                ? playlistTracks.length + ' трека'
                                : playlistTracks.length + ' треков'}
                        </h4>
                    </div>
                </div>
            </div>
        </Link>
    ));
};

export default PlaylistBlock;

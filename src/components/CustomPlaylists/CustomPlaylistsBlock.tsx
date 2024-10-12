import { FaMusic } from 'react-icons/fa6';
import * as React from 'react';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

const CustomPlaylistsBlock: React.FC<CustomPlaylistObj> = ({
    title,
    parentId,
}) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    return (
        <div className="custplaylist">
            <div className="custplaylist__container-2">
                <div className="custplaylist__images">
                    <FaMusic className="custplaylist__images-icon" />
                </div>
                <Link to={`/custom-playlist/${parentId}`}>
                    <h2 className="custplaylist__title">{title}</h2>
                </Link>
                <p>
                    {playlistTracks.length <= 4
                        ? playlistTracks.length + ' трека'
                        : playlistTracks.length + ' треков'}
                </p>
            </div>
        </div>
    );
};

export default CustomPlaylistsBlock;

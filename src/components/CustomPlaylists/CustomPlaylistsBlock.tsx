import { FaMusic } from 'react-icons/fa6';
import * as React from 'react';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { Link } from 'react-router-dom';

const CustomPlaylistsBlock: React.FC<CustomPlaylistObj> = ({
    title,
    songs,
    parentId,
}) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    {songs.length <= 4
                        ? songs.length + ' трека'
                        : songs.length + ' треков'}
                </p>
            </div>
        </div>
    );
};

export default CustomPlaylistsBlock;

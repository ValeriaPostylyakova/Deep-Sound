import { FaMusic } from 'react-icons/fa6';
import * as React from 'react';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';

const CustomPlaylistsBlock: React.FC<CustomPlaylistObj> = ({
    title,
    songs,
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
                <h2>{title}</h2>
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

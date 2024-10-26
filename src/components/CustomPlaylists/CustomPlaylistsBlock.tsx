import * as React from 'react';
import { Link } from 'react-router-dom';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { FaMusic } from 'react-icons/fa6';

const CustomPlaylistsBlock: React.FC<CustomPlaylistObj> = ({
    title,
    parentId,
}) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Link to={`/Deep-Sound/custom-playlist/${parentId}`}>
            <div className="custplaylist">
                <div className="custplaylist__container-2">
                    <div className="custplaylist__images">
                        <FaMusic className="custplaylist__images-icon" />
                    </div>

                    <h2 className="custplaylist__title">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default CustomPlaylistsBlock;

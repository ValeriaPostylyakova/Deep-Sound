import { favorite1 } from '../viteImages/images.ts';
import * as React from 'react';

type FavoritePlaylistsEmpty = {
    title: string;
};

const FavoritePlaylistsEmpty: React.FC<FavoritePlaylistsEmpty> = ({
    title,
}) => {
    return (
        <div className="favorite__container_1">
            <div className="favorite__title-container">
                <img
                    src={favorite1}
                    className="favorite__icon"
                    alt="favorite"
                />
                <p className="favorite__title">{title}</p>
            </div>
        </div>
    );
};

export default FavoritePlaylistsEmpty;

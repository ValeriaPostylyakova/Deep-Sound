import * as React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setGenreId } from '../../redux/genres/slice.ts';

type GenresBlockProps = {
    id: number;
    imageUrl: string;
    linkUrl: string;
};

const GenresBlock: React.FC<GenresBlockProps> = ({ imageUrl, linkUrl, id }) => {
    const dispatch: AppDispatch = useDispatch();
    const onClickPlaylist = (id: number) => {
        dispatch(setGenreId(id));
    };

    return (
        <Link
            to={linkUrl}
            className="genres__container_link"
            onClick={() => onClickPlaylist(id)}
        >
            <div className="genres__container_playlist">
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;

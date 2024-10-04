import * as React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setCategoryArray } from '../../redux/genres/slice.ts';
import { setGenreId } from '../../redux/genre/slice.ts';
import { CategoryArray } from '../../redux/genres/types.ts';

type GenresBlockProps = {
    id: number;
    imageUrl: string;
    linkUrl: string;
    categoryArray: CategoryArray[];
};

const GenresBlock: React.FC<GenresBlockProps> = ({
    id,
    imageUrl,
    linkUrl,
    categoryArray,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickPlaylist = ({ id, categoryArray }) => {
        dispatch(setGenreId(id));
        dispatch(setCategoryArray(categoryArray));
    };

    return (
        <Link
            to={linkUrl}
            className="genres__container_link"
            onClick={() => onClickPlaylist({ id, categoryArray })}
        >
            <div className="genres__container_playlist">
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;
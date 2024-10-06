import * as React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setCategoryArray } from '../../redux/genres/slice.ts';
import { setGenreId, setTitle } from '../../redux/genre/slice.ts';
import { CategoryArray } from '../../redux/genres/types.ts';

export type GenresBlockProps = {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl: string;
    categoryArray: CategoryArray[] | null;
};

const GenresBlock: React.FC<GenresBlockProps> = ({
    id,
    title,
    imageUrl,
    linkUrl,
    categoryArray,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickPlaylist = (id: number, categoryArray: CategoryArray[] | null, title: string | null) => {
        dispatch(setGenreId(id));
        dispatch(setTitle(title));
        dispatch(setCategoryArray(categoryArray));
    };

    return (
        <Link
            to={linkUrl}
            className="genres__container_link"
            onClick={() => onClickPlaylist(id, categoryArray, title)}
        >
            <div className="genres__container_playlist">
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;

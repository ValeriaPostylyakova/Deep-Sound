import * as React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';

import { CategoryArray } from '../../redux/genres/types.ts';
import { genresAction } from '../../redux/genres/slice.ts';
import { genreAction } from '../../redux/genre/slice.ts';

export type GenresBlockProps = {
    id: number;
    title?: string;
    imageUrl: string;
    linkUrl: string;
    categoryArray?: CategoryArray[];
    className: string;
};

const GenresBlock: React.FC<GenresBlockProps> = ({
    id,
    title,
    imageUrl,
    linkUrl,
    categoryArray,
    className,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickPlaylist = (
        id: number,
        categoryArray: CategoryArray[] | undefined,
        title: string | undefined
    ) => {
        dispatch(genreAction.setGenreId(id));
        dispatch(genreAction.setTitle(title));
        dispatch(genresAction.setCategoryArray(categoryArray));
    };

    return (
        <Link
            to={linkUrl}
            className="genres__container_link"
            onClick={() => onClickPlaylist(id, categoryArray, title)}
        >
            <div className={className}>
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;

import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../redux/store.ts';
import { useDispatch } from 'react-redux';
import { setTitle } from '../redux/collections/slice.ts';
import { setCollectionId } from '../redux/collection/slice.ts';

type CollectionBlockProps = {
    id: number;
    title?: string;
    imageUrl: string;
    linkUrl: string;
};

const CollectionsBlock: React.FC<CollectionBlockProps> = ({
    id,
    title,
    imageUrl,
    linkUrl,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickCollectionsBlock = (id: number) => {
        dispatch(setCollectionId(id));
        dispatch(setTitle(title));
    };

    return (
        <Link
            onClick={() => onClickCollectionsBlock(id)}
            className="genres__link"
            to={linkUrl}
        >
            <div className="collections__playlist">
                <p className="collections__title">{title}</p>
                <img src={imageUrl} alt="col1" />
            </div>
        </Link>
    );
};

export default CollectionsBlock;

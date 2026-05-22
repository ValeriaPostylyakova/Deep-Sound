import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { fetchCollections } from '../redux/collections/asyncAction.ts';

import GoBack from '../components/GoBack.tsx';
import CollectionsBlock from '../components/CollectionsBlock/CollectionsBlock.tsx';

const Collections = () => {
    const dispatch: AppDispatch = useDispatch();
    const { collections } = useSelector(
        (state: RootState) => state.collectionsReducer
    );
    React.useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchCollections());
    }, []);

    return (
        <>
            <GoBack />
            <div className="collections__container">
                {collections.map((collection) => (
                    <CollectionsBlock key={collection.id} {...collection} />
                ))}
            </div>
        </>
    );
};

export default Collections;

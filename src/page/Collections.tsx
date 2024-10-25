import GoBack from '../components/GoBack.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';
import * as React from 'react';
import { AppDispatch, RootState } from '../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../redux/collections/asyncAction.ts';

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

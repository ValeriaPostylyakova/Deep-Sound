import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PlaylistObj } from '../redux/genre/types.ts';
import { fetchCollection } from '../redux/collection/asyncAction.ts';

import { AppDispatch, RootState } from '../redux/store.ts';
import GoBackNavigate from '../components/GoBackNavigate.tsx';
import Playlist from '../components/Playlist/Playlist.tsx';
import PlaylistSkeleton from '../components/Playlist/PlaylistSkeleton.tsx';

const Collection = () => {
    const { title } = useSelector((state: RootState) => state.collections);
    const { playlists, status, collectionId } = useSelector(
        (state: RootState) => state.collection
    );

    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCollection(collectionId));
    }, [collectionId]);

    return (
        <section className="main__container-page">
            <GoBackNavigate title={title} />
            <div className="genres__item-wrapper">
                <div className="genres__item-container">
                    <h2 className="genres__item-subtitle">
                        Популярные плейлисты
                    </h2>
                    <div className="genres__item-playlists">
                        {playlists.map(
                            (collection: PlaylistObj, index: number) =>
                                status === 'loading' ? (
                                    <PlaylistSkeleton key={index} />
                                ) : (
                                    <Playlist
                                        key={collection.id}
                                        {...collection}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Collection;

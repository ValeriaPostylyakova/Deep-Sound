import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store.ts';

import Category from '../components/Category.tsx';
import Playlist from '../components/Playlist/Playlist.tsx';
import * as React from 'react';
import { fetchGenre } from '../redux/genre/asyncAction.ts';
import PlaylistSkeleton from '../components/Playlist/PlaylistSkeleton.tsx';

const Genre = () => {
    const dispatch: AppDispatch = useDispatch();
    const { genre, genreId, categoryId, statusGenre } = useSelector(
        (state: RootState) => state.genre
    );

    React.useEffect(() => {
        const categoryFilter = `${categoryId > 0 ? `category=${categoryId}` : ''}`;

        dispatch(
            fetchGenre({
                genreId,
                categoryFilter,
            })
        );
    }, [categoryId, genreId]);

    return (
        <section className="main__container-page">
            <Category />
            <div className="genres__item-wrapper">
                <div className="genres__item-container">
                    <h1 className="genres__item-title">Популярные плейлисты</h1>
                    <div className="genres__item-playlists">
                        {genre.map((value, index: number) =>
                            statusGenre === 'loading' ? (
                                <PlaylistSkeleton key={index} />
                            ) : (
                                <Playlist key={index} {...value} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Genre;

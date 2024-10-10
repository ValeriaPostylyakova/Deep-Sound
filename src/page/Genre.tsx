import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store.ts';
import { fetchGenre } from '../redux/genre/asyncAction.ts';

import Category from '../components/Category.tsx';
import Playlist from '../components/Playlist/Playlist.tsx';
import PlaylistSkeleton from '../components/Playlist/PlaylistSkeleton.tsx';
import GoBackNavigate from '../components/GoBackNavigate.tsx';

const Genre = () => {
    const dispatch: AppDispatch = useDispatch();
    const { genre, genreId, categoryId, title, statusGenre } = useSelector(
        (state: RootState) => state.genreReducer
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
            <GoBackNavigate title={title} />
            <Category />
            <div className="genres__item-wrapper">
                <div className="genres__item-container">
                    <h2 className="genres__item-subtitle">
                        Популярные плейлисты
                    </h2>
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

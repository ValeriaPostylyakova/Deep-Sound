import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store.ts';

import Category from '../components/Category.tsx';
import Playlist from '../components/Playlist.tsx';
import * as React from 'react';
import axios from 'axios';
import { setGenre } from '../redux/genres/slice.ts';

const Genre = () => {
    const dispatch: AppDispatch = useDispatch();
    const { genre, genreId, categoryId } = useSelector(
        (state: RootState) => state.genres
    );

    React.useEffect(() => {
        const categoryFilter = `${categoryId > 0 ? `category=${categoryId}` : ''}`;

        async function fetchGenre() {
            const { data } = await axios.get(
                `https://985cc4acb156d262.mokky.dev/playlists?currentId=${genreId}&${categoryFilter}`
            );
            dispatch(setGenre(data));
        }

        fetchGenre();
    }, [categoryId]);

    return (
        <section className="main__container-page">
            <Category />
            <div className="genres__item-wrapper">
                <div className="genres__item-container">
                    <h1 className="genres__item-title">Популярные плейлисты</h1>
                    <div className="genres__item-playlists">
                        {genre.map((value, index: number) => (
                            <Playlist key={index} {...value} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Genre;

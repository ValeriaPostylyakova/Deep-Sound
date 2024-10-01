import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store.ts';
import { fetchGenres } from '../../redux/genres/asyncAction.ts';

import Category from '../../components/Category.tsx';
import Playlist from '../../components/Playlist.tsx';
import * as React from 'react';

const Pop = () => {
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchGenres());
    }, []);

    const { genres } = useSelector((state: RootState) => state.genres);
    return (
        <section className="main__container-page">
            <Category />
            <div className="genres__item-wrapper">
                <div className="genres__item-container">
                    <h1 className="genres__item-title">Популярные плейлисты</h1>
                    {genres.map((genre) => (
                        <Playlist key={genre.id} playlists={genre.playlists} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pop;

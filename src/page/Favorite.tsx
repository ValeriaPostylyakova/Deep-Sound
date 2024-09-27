import * as React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { setFavorite } from '../redux/favorite/slice.ts';

import Player from '../components/FullPlayer/Player.tsx';
import PlayerSlider from '../components/PlayerSlider.tsx';
import FavoriteEmpty from '../components/FavoriteEmpty.tsx';
import FavoriteBlock from '../components/FavoriteBlock.tsx';
import { SongObj } from '../redux/songs/types.ts';

const Favorite = () => {
    const dispatch: AppDispatch = useDispatch();
    const { favorite } = useSelector((state: RootState) => state.favorite);

    React.useEffect(() => {
        async function dataFavorite() {
            try {
                const { data } = await axios.get(
                    'https://985cc4acb156d262.mokky.dev/favorite'
                );
                dispatch(setFavorite(data));
            } catch (err) {
                alert('Ошибка при получении закладок');
                console.error(err);
            }
        }

        dataFavorite();
    }, []);

    return (
        <>
            <section className="favorite">
                <h1>Избранное</h1>
                {favorite.length > 0 ? (
                    <div className="favorite__container_2">
                        {favorite.map((obj: SongObj) => (
                            <FavoriteBlock {...obj} key={obj.id} />
                        ))}
                    </div>
                ) : (
                    <FavoriteEmpty />
                )}
            </section>
            <Player />
            <PlayerSlider />
        </>
    );
};

export default Favorite;

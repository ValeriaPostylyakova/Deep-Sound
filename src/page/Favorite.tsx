import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';

import FavoriteEmpty from '../components/Favorite/FavoriteEmpty.tsx';
import FavoriteBlock from '../components/Favorite/FavoriteBlock.tsx';
import { SongObj } from '../redux/songs/types.ts';
import FavoriteSkeleton from '../components/Favorite/FavoriteSkeleton.tsx';
import { fetchFavorite } from '../redux/favorite/AsyncAction.ts';

const Favorite = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blockFavorite, status } = useSelector(
        (state: RootState) => state.favorite
    );

    React.useEffect(() => {
        dispatch(fetchFavorite());
    }, []);

    return (
        <>
            <section className="favorite">
                <h1>Избранное</h1>
                {blockFavorite.length > 0 ? (
                    <div className="favorite__container_2">
                        {blockFavorite.map((obj: SongObj, index: number) =>
                            status === 'loading' ? (
                                <FavoriteSkeleton key={index} />
                            ) : (
                                <FavoriteBlock {...obj} key={obj.id} />
                            )
                        )}
                    </div>
                ) : (
                    <FavoriteEmpty />
                )}
            </section>
        </>
    );
};

export default Favorite;

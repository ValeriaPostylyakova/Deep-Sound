import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { fetchFavorite } from '../redux/favorite/AsyncAction.ts';
import { SongObj } from '../redux/songs/types.ts';

import EmptyBlock from '../components/EmptyBlock.tsx';
import FavoriteBlock from '../components/Favorite/FavoriteBlock.tsx';
import FavoriteSkeleton from '../components/Favorite/FavoriteSkeleton.tsx';

const Favorite = () => {
    const dispatch: AppDispatch = useDispatch();
    const { blockFavorite, status } = useSelector(
        (state: RootState) => state.favoriteReducer
    );

    React.useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchFavorite());
    }, [dispatch]);

    return (
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
                <EmptyBlock title="У вас пока нет избранных треков" />
            )}
        </section>
    );
};

export default Favorite;

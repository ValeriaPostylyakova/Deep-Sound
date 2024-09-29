import * as React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import FavoriteEmpty from '../components/Favorite/FavoriteEmpty.tsx';
import FavoriteBlock from '../components/Favorite/FavoriteBlock.tsx';
import { SongObj } from '../redux/songs/types.ts';
import FavoriteSkeleton from '../components/Favorite/FavoriteSkeleton.tsx';

const Favorite = () => {
    const { blockFavorite } = useSelector((state: RootState) => state.favorite);

    // React.useEffect(() => {
    //     async function dataFavorite() {
    //         try {
    //             const { data } = await axios.get(
    //                 'https://985cc4acb156d262.mokky.dev/favorite'
    //             );
    //         } catch (err) {
    //             alert('Ошибка при получении закладок');
    //             console.error(err);
    //         }
    //     }
    //
    //     dataFavorite();
    // }, []);

    return (
        <>
            <section className="favorite">
                <h1>Избранное</h1>
                {blockFavorite.length > 0 ? (
                    <div className="favorite__container_2">
                        {blockFavorite.map((obj: SongObj, index) => (
                            // <FavoriteBlock {...obj} key={index} />
                            <FavoriteSkeleton />
                        ))}
                    </div>
                ) : (
                    <FavoriteEmpty />
                )}
            </section>
        </>
    );
};

export default Favorite;

import * as React from 'react';
import { Link } from 'react-router-dom';

import { fetchSongs } from '../redux/songs/asyncAction.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { SongObj } from '../redux/songs/types.ts';

import Title from '../components/Title.tsx';
import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import GenresBlock from '../components/GenresBlock/GenresBlock.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';
import SliderBlock from '../components/Slider/SliderBlock.tsx';
import SoundBlockSkeleton from '../components/SoundBlock/SoundBlockSkeleton.tsx';
import { fetchGenres } from '../redux/genres/asyncAction.ts';
import GenresBlockSkeleton from '../components/GenresBlock/GenresBlockSkeleton.tsx';
import { Genres } from '../redux/genres/types.ts';
import { fetchCollections } from '../redux/collections/asyncAction.ts';

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { status, songs } = useSelector(
        (state: RootState) => state.songsReducer
    );
    const { statusGenres, genres } = useSelector(
        (state: RootState) => state.genresReducer
    );
    const searchValue = useSelector(
        (state: RootState) => state.filterReducer.searchValue
    );
    const { collections } = useSelector(
        (state: RootState) => state.collectionsReducer
    );

    React.useEffect(() => {
        dispatch(fetchSongs());
        dispatch(fetchGenres());
        dispatch(fetchCollections());
    }, [dispatch]);

    return (
        <>
            <SliderBlock />
            <Link className="link" to="chart">
                <Title text="Чарт DEEP SOUND" />
            </Link>
            <section className="sound">
                {songs
                    .filter((obj: SongObj) =>
                        obj.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    )
                    .slice(0, 8)
                    .map((song: SongObj, index: number) =>
                        status === 'loading' ? (
                            <SoundBlockSkeleton key={index} />
                        ) : (
                            <SoundBlock key={song.id} {...song} />
                        )
                    )}
            </section>
            <Link className="link" to="genres">
                <Title text="Жанры" />
            </Link>
            <section className="genres">
                <div className="genres__container">
                    {genres
                        .map((genre: Genres, index: number) =>
                            statusGenres === 'loading' ? (
                                <GenresBlockSkeleton key={index} />
                            ) : (
                                <GenresBlock
                                    categoryArray={[]}
                                    title=""
                                    key={genre.id}
                                    {...genre}                                />
                            )
                        )}
                </div>
            </section>
            <Link className="link" to="collections">
                <Title text="Подборки" />
            </Link>
            <section className="collections">
                <div className="collections__container">
                    {collections.map((collection) => (
                        <CollectionsBlock key={collection.id} {...collection} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;

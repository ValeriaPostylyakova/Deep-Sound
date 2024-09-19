import * as React from 'react';
import { fetchSongs } from '../redux/songs/slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';

import { Link } from 'react-router-dom';

import Title from '../components/Title.tsx';
import SoundBlock from '../components/SoundBlock.tsx';
import GenresBlock from '../components/GenresBlock.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';
import SliderBlock from '../components/Slider/SliderBlock.tsx';

const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const { songs } = useSelector((state: RootState) => state.songs);

    React.useEffect(() => {
        dispatch(fetchSongs());
    }, []);

    return (
        <>
            <SliderBlock />
            <Link className="link" to="chart">
                <Title text="Чарт DEEP SOUND" />
            </Link>
            <section className="sound">
                {songs.slice(0, 6).map((song) => (
                    <SoundBlock {...song} />
                ))}
            </section>
            <Link className="link" to="genres">
                <Title text="Жанры" />
            </Link>
            <section className="genres">
                <div className="genres__container">
                    <GenresBlock />
                </div>
            </section>
            <Link className="link" to="collections">
                <Title text="Подборки" />
            </Link>
            <section className="collections">
                <div className="collections__container">
                    <CollectionsBlock />
                </div>
            </section>
        </>
    );
};

export default Home;

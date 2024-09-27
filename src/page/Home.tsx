import * as React from 'react';
import { Link } from 'react-router-dom';

import { fetchSongs } from '../redux/songs/asyncAction.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { SongObj } from '../redux/songs/types.ts';

import Title from '../components/Title.tsx';
import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import GenresBlock from '../components/GenresBlock.tsx';
import CollectionsBlock from '../components/CollectionsBlock.tsx';
import SliderBlock from '../components/Slider/SliderBlock.tsx';
import Player from '../components/FullPlayer/Player.tsx';
import SoundBlockSkeleton from '../components/SoundBlock/SoundBlockSkeleton.tsx';
import PlayerSlider from '../components/PlayerSlider.tsx';

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { status, songs } = useSelector((state: RootState) => state.songs);
    const { searchValue } = useSelector((state: RootState) => state.filter);

    React.useEffect(() => {
        dispatch(fetchSongs());
    }, []);

    // const onClickChart = (e) => {

    // };
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
            <Player />
            <PlayerSlider />
        </>
    );
};

export default Home;

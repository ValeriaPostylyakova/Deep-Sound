import * as React from 'react';

import { SongObj } from '../redux/songs/types.ts';
import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import Title from '../components/Title.tsx';
import Player from '../components/FullPlayer/Player.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

const Chart = () => {
    const { songs } = useSelector((state: RootState) => state.songs);

    return (
        <>
            <Title text="Чарт DEEP SOUND" />
            <div className="chart__container">
                {songs.map((song: SongObj) => (
                    <SoundBlock key={song.id} {...song} />
                ))}
            </div>
            <Player />
        </>
    );
};

export default Chart;

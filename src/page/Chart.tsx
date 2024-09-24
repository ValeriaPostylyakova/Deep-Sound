import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import Title from '../components/Title.tsx';
import { fetchSongs } from '../redux/songs/asyncAction.ts';
import { AppDispatch, RootState } from '../redux/store.ts';

const Chart = () => {
    const dispatch: AppDispatch = useDispatch();
    const { songs } = useSelector((state: RootState) => state.songs);

    React.useEffect(() => {
        dispatch(fetchSongs());
    }, []);

    return (
        <>
            <Title text="Чарт DEEP SOUND" />
            <div className="chart__container">
                {songs.map((song) => (
                    <SoundBlock {...song} />
                ))}
            </div>
        </>
    );
};

export default Chart;

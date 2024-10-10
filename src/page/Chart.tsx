import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { SongObj } from '../redux/songs/types.ts';
import { fetchSongs } from '../redux/songs/asyncAction.ts';

import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import GoBack from '../components/GoBack.tsx';

const Chart = () => {
    const dispatch: AppDispatch = useDispatch();
    const { songs } = useSelector((state: RootState) => state.songsReducer);

    React.useEffect(() => {
        scrollTo(0, 0);
        dispatch(fetchSongs());
    }, []);

    return (
        <>
            <GoBack />
            <div className="chart__container">
                {songs.map((song: SongObj) => (
                    <SoundBlock key={song.id} {...song} />
                ))}
            </div>
        </>
    );
};

export default Chart;

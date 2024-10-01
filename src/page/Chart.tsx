import { SongObj } from '../redux/songs/types.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import SoundBlock from '../components/SoundBlock/SoundBlock.tsx';
import GoBack from '../components/GoBack.tsx';

const Chart = () => {
    const { songs } = useSelector((state: RootState) => state.songs);

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

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import PlayerArray from './PlayerArray.tsx';

const PlayerPlaylist = () => {
    const { playerActive, playlist } = useSelector(
        (state: RootState) => state.playlistReducer
    );

    return (
        playerActive && (
            <div className="player">
                <PlayerArray sliceArray={playlist} />
            </div>
        )
    );
};

export default PlayerPlaylist;

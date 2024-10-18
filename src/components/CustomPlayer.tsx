import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import PlayerCustomPlaylist from './PlayerCustomPlaylist.tsx';

const CustomPlayer = () => {
    const activePlayer = useSelector(
        (state: RootState) => state.playlistTracksReducer.activePlayer
    );

    return (
        activePlayer && (
            <div className="player">
                <PlayerCustomPlaylist />
            </div>
        )
    );
};

export default CustomPlayer;

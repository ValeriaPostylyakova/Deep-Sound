import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import PlayerArray from './PlayerArray.tsx';

const PlayerCustomPlaylist = () => {
    const activePlayer = useSelector(
        (state: RootState) => state.playlistTracksReducer.activePlayer
    );

    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );
    const songId = useSelector(
        (state: RootState) => state.playlistTracksReducer.songId
    );

    const songIndex = playlistTracks.findIndex((obj) => obj.id === songId);

    return (
        activePlayer && (
            <div className="player">
                <PlayerArray
                    sliceArray={playlistTracks}
                    songIndex={songIndex}
                />
            </div>
        )
    );
};

export default PlayerCustomPlaylist;

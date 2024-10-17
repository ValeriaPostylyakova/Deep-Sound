import CustomSongBlock from '../components/CustomPlaylists/CustomSongBlock.tsx';
import { SongObj } from '../redux/songs/types.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import CreatePlaylist from '../components/createCustomBlocks/CreatePlaylist.tsx';
import DeletePlaylistModal from '../components/createCustomBlocks/DeletePlaylistModal.tsx';

const CreateCustomPlaylist = () => {
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );
    const id = window.location.pathname.slice(17);
    const findObj = customPlaylists.find((obj) => obj.parentId === id);

    return (
        <div className="custom__wrapper">
            <CreatePlaylist findObj={findObj} />
            {playlistTracks.length > 0 && (
                <div className="bottom">
                    <div className="bottom__container">
                        <h1 className="custom__title">Треки</h1>
                        <div className="custom__container-songs">
                            {playlistTracks.map(
                                (song: SongObj, index: number) => (
                                    <CustomSongBlock {...song} key={index} />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
            <DeletePlaylistModal />
        </div>
    );
};

export default CreateCustomPlaylist;

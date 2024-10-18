import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import * as React from 'react';

const DeletePlaylistModal: React.FC = () => {
    const deletePlaylist = useSelector(
        (state: RootState) => state.createPlaylistReducer.deletePlaylist
    );

    return (
        <div
            className={
                deletePlaylist ? 'custom__modal active' : 'custom__modal'
            }
        >
            <div className="custom__modal-container">
                <p>Плейлист удалён</p>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;

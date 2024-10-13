import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

const DeletePlaylistModal = () => {
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
                <div className="custom__modal-line"></div>
                <button>Отменить</button>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;

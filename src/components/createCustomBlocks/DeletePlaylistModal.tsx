import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';

const DeletePlaylistModal = () => {
    const dispatch: AppDispatch = useDispatch();
    const deletePlaylist = useSelector(
        (state: RootState) => state.createPlaylistReducer.deletePlaylist
    );

    const onClickRestore = () => {
        dispatch(createPlaylistAction.setRestorePlaylist(true));
    };

    return (
        <div
            className={
                deletePlaylist ? 'custom__modal active' : 'custom__modal'
            }
        >
            <div className="custom__modal-container">
                <p>Плейлист удалён</p>
                <div className="custom__modal-line"></div>
                <button onClick={onClickRestore}>Отменить</button>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;

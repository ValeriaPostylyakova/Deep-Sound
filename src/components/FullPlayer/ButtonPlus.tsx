import { FiPlus } from 'react-icons/fi';
import { playerAction } from '../../redux/player/slice.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteAction } from '../../redux/favorite/slice.ts';

const ButtonPlus = () => {
    const dispatch: AppDispatch = useDispatch();

    const addedSong = useSelector(
        (state: RootState) => state.playerReducer.addedSong
    );
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );

    const handleModal = () => {
        dispatch(favoriteAction.setFavoriteAdded({ title: '', added: false }));
    };

    const onClickAddedSong = () => {
        if (customPlaylists.length === 0) {
            dispatch(
                favoriteAction.setFavoriteAdded({
                    title: 'Для того, чтобы добавить трек, необходимо создать плейлист',
                    added: true,
                })
            );
            setTimeout(handleModal, 5000);
        } else {
            dispatch(playerAction.setAddedSong(!addedSong));
        }
    };

    return (
        <button onClick={onClickAddedSong}>
            <FiPlus className="player__left-button" />
        </button>
    );
};

export default ButtonPlus;

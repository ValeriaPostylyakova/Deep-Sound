import { FiPlus } from 'react-icons/fi';
import { playerAction } from '../../redux/player/slice.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteAction } from '../../redux/favorite/slice.ts';
import AddedPlaylistModal from './AddedPlaylistModal.tsx';
import * as React from 'react';

const ButtonPlus = () => {
    const dispatch: AppDispatch = useDispatch();

    const addedSong = useSelector(
        (state: RootState) => state.playerReducer.addedSong
    );
    const customPlaylists = useSelector(
        (state: RootState) => state.createPlaylistReducer.customPlaylists
    );

    const plusRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        if(!addedSong) return;

        const handleClick = (e: MouseEvent) => {
            if(!plusRef.current) return;
            if(!plusRef.current.contains(e.target as Node)) {
                dispatch(playerAction.setAddedSong(false));
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [dispatch, addedSong])

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
        <>
            <button ref={plusRef} onClick={onClickAddedSong}>
                <FiPlus className="player__left-button" />
            </button>
            {addedSong && <AddedPlaylistModal obj={undefined}/>}
        </>
    );
};

export default ButtonPlus;

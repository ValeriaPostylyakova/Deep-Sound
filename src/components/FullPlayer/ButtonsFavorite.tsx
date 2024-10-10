import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';

import { SongObj } from '../../redux/songs/types.ts';

import { FiPlus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import { favoriteAction } from '../../redux/favorite/slice.ts';
import AddedPlaylistModal from './AddedPlaylistModal.tsx';
import { playerAction } from '../../redux/player/slice.ts';

type ButtonsFavoriteProps = {
    objFavorite: SongObj;
};

const ButtonsFavorite: React.FC<ButtonsFavoriteProps> = ({ objFavorite }) => {
    const dispatch: AppDispatch = useDispatch();
    const favoriteActive = useSelector(
        (state: RootState) => state.favoriteReducer.favoriteActive
    );
    const addedSong = useSelector(
        (state: RootState) => state.playerReducer.addedSong
    );

    const onClickAddFavorite = async () => {
        // const findObj = favorite.find((obj) => obj.currentId === id);
        //
        // try {
        //     if (findObj) {
        //         favorite.filter((obj: SongObj) => obj.id !== findObj.id);
        //         await axios.delete(
        //             `https://985cc4acb156d262.mokky.dev/favorite/${findObj.id}`
        //         );
        //     } else {
        //         const { data } = await axios.post(
        //             `https://985cc4acb156d262.mokky.dev/favorite`,
        //             { ...objFavorite }
        //         );
        //         dispatch(favoriteAction.setFavorite(data));
        //     }
        // } catch (e) {
        //     console.error(e);
        //     alert(
        //         'Ошибка при получении или удалении закладки. Обновите страницу и попробуйте ещё раз'
        //     );
        // }
        dispatch(favoriteAction.setFavorite({ ...objFavorite }));
    };

    const onClickAddedSong = () => {
        dispatch(playerAction.setAddedSong(!addedSong));
    };

    return (
        <div className="player__left_buttons">
            <button onClick={onClickAddFavorite}>
                {favoriteActive ? (
                    <FaHeart className="player__left-button-red" />
                ) : (
                    <GrFavorite className="player__left-button" />
                )}
            </button>
            <div className="added__container">
                <button onClick={onClickAddedSong}>
                    <FiPlus className="player__left-button" />
                </button>
                {addedSong && <AddedPlaylistModal />}
            </div>
        </div>
    );
};

export default ButtonsFavorite;

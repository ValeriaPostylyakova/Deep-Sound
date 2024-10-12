import { FaHeart } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { SongObj } from '../../redux/songs/types.ts';
import axios from 'axios';
import { favoriteAction } from '../../redux/favorite/slice.ts';
import { ButtonsFavoriteProps } from './ButtonsFavoritePlus.tsx';

const ButtonFavorite: React.FC<ButtonsFavoriteProps> = ({ objFavorite }) => {
    const dispatch: AppDispatch = useDispatch();

    const favoriteActive = useSelector(
        (state: RootState) => state.favoriteReducer.favoriteActive
    );

    const favorite = useSelector(
        (state: RootState) => state.favoriteReducer.favorite
    );

    const onClickAddFavorite = async () => {
        const findObj = favorite.find(
            (obj) => obj.currentId === objFavorite.id
        );

        try {
            if (findObj) {
                favorite.filter((obj: SongObj) => obj.id !== findObj.id);
                await axios.delete(
                    `https://985cc4acb156d262.mokky.dev/favorite/${findObj.id}`
                );
            } else {
                const { data } = await axios.post(
                    `https://985cc4acb156d262.mokky.dev/favorite`,
                    { ...objFavorite }
                );
                dispatch(favoriteAction.setFavorite(data));
            }
        } catch (e) {
            console.error(e);
            alert(
                'Ошибка при получении или удалении закладки. Обновите страницу и попробуйте ещё раз'
            );
        }
    };

    return (
        <button onClick={onClickAddFavorite}>
            {favoriteActive ? (
                <FaHeart className="player__left-button-red" />
            ) : (
                <GrFavorite className="player__left-button" />
            )}
        </button>
    );
};

export default ButtonFavorite;

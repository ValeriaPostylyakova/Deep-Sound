import * as React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setFavorite } from '../../redux/favorite/slice.ts';
import { SongObj } from '../../redux/songs/types.ts';

import { FiPlus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';

type ButtonsFavoriteProps = {
    objFavorite: SongObj | undefined;
};

const ButtonsFavorite: React.FC<ButtonsFavoriteProps> = ({ objFavorite }) => {
    const dispatch: AppDispatch = useDispatch();
    const { favorite, favoriteActive } = useSelector(
        (state: RootState) => state.favorite
    );

    const onClickAddFavorite = async (id: number | undefined) => {
        const findObj = favorite.find((obj) => obj.currentId === id);

        try {
            if (findObj) {
                favorite.filter((obj: SongObj) => obj.id !== findObj.id);
                await axios.delete(
                    `https://985cc4acb156d262.mokky.dev/favorite/${findObj.id}`
                );
            } else {
                const { data } = await axios.post(
                    `https://985cc4acb156d262.mokky.dev/favorite`,
                    { ...objFavorite, favorite: true }
                );
                dispatch(setFavorite(data));
            }
        } catch (e) {
            console.error(e);
            alert(
                'Ошибка при получении или удалении закладки. Обновите страницу и попробуйте ещё раз'
            );
        }
    };

    return (
        <div className="player__left_buttons">
            <button onClick={() => onClickAddFavorite(objFavorite?.id)}>
                {favoriteActive ? (
                    <FaHeart className="player__left-button-red" />
                ) : (
                    <GrFavorite className="player__left-button" />
                )}
            </button>
            <button>
                <FiPlus className="player__left-button" />
            </button>
        </div>
    );
};

export default ButtonsFavorite;

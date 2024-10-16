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

    const favorite = useSelector(
        (state: RootState) => state.favoriteReducer.favorite
    );

    const handleModal = () => {
        dispatch(favoriteAction.setFavoriteAdded({ title: '', added: false }));
    };

    const onClickAddFavorite = async () => {
        const findObj = favorite.find(
            (obj) => obj.currentId === objFavorite?.id
        );

        try {
            if (findObj) {
                favorite.filter((obj: SongObj) => obj.id !== findObj.id);
                await axios.delete(
                    `https://985cc4acb156d262.mokky.dev/favorite/${findObj.id}`
                );

                dispatch(
                    favoriteAction.setFavoriteAdded({
                        title: 'Трек удален из избранных',
                        added: true,
                    })
                );
            } else {
                const { data } = await axios.post(
                    `https://985cc4acb156d262.mokky.dev/favorite`,
                    { ...objFavorite }
                );
                dispatch(favoriteAction.setFavorite(data));

                dispatch(
                    favoriteAction.setFavoriteAdded({
                        title: 'Трек добавлен в избранное',
                        added: true,
                    })
                );
            }
        } catch (e) {
            console.error(e);
            alert(
                'Ошибка при получении или удалении закладки. Обновите страницу и попробуйте ещё раз'
            );
        }

        setTimeout(handleModal, 4000);
    };

    return (
        <button onClick={onClickAddFavorite}>
            <GrFavorite className="player__left-button" />
        </button>
    );
};

export default ButtonFavorite;

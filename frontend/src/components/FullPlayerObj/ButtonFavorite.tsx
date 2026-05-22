import * as React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { SongObj } from '../../redux/songs/types.ts';
import { favoriteAction } from '../../redux/favorite/slice.ts';

import { ButtonsFavoriteProps } from './ButtonsFavoritePlus.tsx';

import { GrFavorite } from 'react-icons/gr';

const ButtonFavorite: React.FC<ButtonsFavoriteProps> = ({ objFavorite }) => {
    const dispatch: AppDispatch = useDispatch();

    const favorite = useSelector(
        (state: RootState) => state.favoriteReducer.favorite
    );

    const handleModal = () => {
        dispatch(favoriteAction.setFavoriteAdded({ title: '', added: false }));
    };

    const addedFavorite = async () => {
        try {
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
        } catch(err) {
            console.error(err);
            alert(
                'Ошибка при получении закладки. Обновите страницу и попробуйте ещё раз'
            );
        }
    }

    const removeFavorite = async (findObj: SongObj) => {
      try {
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
      } catch (err) {
          console.error(err);
          alert(
              'Ошибка при удалении закладки. Обновите страницу и попробуйте ещё раз'
          );
      }
    }

    const onClickAddFavorite = () => {
        const findObj = favorite.find(
            (obj) => obj.currentId === objFavorite?.id
        );
        if (findObj) {
            removeFavorite(findObj)
        } else {
            addedFavorite();
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

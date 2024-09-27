import * as React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { SongObj } from '../../redux/songs/types.ts';

import { GrFavorite } from 'react-icons/gr';
import { FiPlus } from 'react-icons/fi';
import { setFavorite } from '../../redux/favorite/slice.ts';

type ButtonsFavoriteProps = {
    objFavorite: SongObj;
};

const ButtonsFavorite: React.FC<ButtonsFavoriteProps> = ({ objFavorite }) => {
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();

    const { favorite } = useSelector((state: RootState) => state.favorite);

    const obj = { ...objFavorite, currentId: objFavorite.id };

    const onClickAddFavorite = () => {
        // const findObjFavorite = favorite.find(
        //     (objState) => objState.id === obj.currentId
        // );
        //
        // if (findObjFavorite) {
        //     axios.delete(
        //         `https://985cc4acb156d262.mokky.dev/favorite/${obj.currentId}`
        //     );
        // } else {
        axios.post('https://985cc4acb156d262.mokky.dev/favorite', obj);
        dispatch(setFavorite(obj));
        setIsFavorite(!isFavorite);
        // }
    };

    return (
        <div className="player__left_buttons">
            <button onClick={onClickAddFavorite}>
                {isFavorite ? (
                    <GrFavorite className="player__left-button-red" />
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

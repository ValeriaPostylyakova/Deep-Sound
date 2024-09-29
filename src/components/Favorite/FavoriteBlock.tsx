import * as React from 'react';
import axios from 'axios';

import { GrFavorite } from 'react-icons/gr';

import { removeItem } from '../../redux/favorite/slice.ts';
import { SongObj } from '../../redux/songs/types.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa6';
import { setActivePlayerSlide } from '../../redux/sliderPlayer/slice.ts';
import { setClickPlay } from '../../redux/songs/slice.ts';
import { setPlay, setSong } from '../../redux/player/slice.ts';

const FavoriteBlock: React.FC<SongObj> = ({
    id,
    title,
    imageUrl,
    time,
    author,
    currentId,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickSoundPlay = () => {
        dispatch(setActivePlayerSlide(false));
        dispatch(setPlay(false));
        dispatch(setSong({ id: currentId }));
        dispatch(setClickPlay(true));
    };

    const onClickRemoveFavorite = () => {
        axios.delete(`https://985cc4acb156d262.mokky.dev/favorite/${id}`);
        dispatch(removeItem({ id }));
    };

    return (
        <div className="sound__block">
            <div>
                <div onClick={onClickSoundPlay} className="sound__left">
                    <div className="sound__container-block">
                        <img
                            className="sound__image-author-favorite"
                            src={imageUrl}
                            alt="autor"
                        />
                    </div>
                    <div className="sound__name-favorite">
                        <h3>{title}</h3>
                        <p>{author}</p>
                    </div>
                </div>
            </div>
            <div className="sound__right">
                <p className="sound__time-favorite">{time}</p>
                <button onClick={onClickRemoveFavorite}>
                    {/*<GrFavorite className="sound__right-favorite" />*/}
                    <FaHeart className="player__left-button-red" />
                </button>
            </div>
        </div>
    );
};

export default FavoriteBlock;

import * as React from 'react';
import axios from 'axios';

import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { SongObj } from '../../redux/songs/types.ts';
import { songsAction } from '../../redux/songs/slice.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { favoriteAction } from '../../redux/favorite/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';

import { FaHeart } from 'react-icons/fa6';

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
        dispatch(playerAction.setSong({ id: currentId }));
        dispatch(sliderAction.setActivePlayerSlide(false));
        dispatch(playlistTracksActions.setActivePlayer(false));
        dispatch(playerAction.setPlay(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(songsAction.setClickPlay(true));
    };

    const onClickRemoveFavorite = async () => {
        await axios.delete(`https://985cc4acb156d262.mokky.dev/favorite/${id}`);
        dispatch(favoriteAction.removeItem({ id }));
    };

    return (
        <div className="sound__block">
            <div className="sound__block_container" onClick={onClickSoundPlay}>
                <div className="sound__left">
                    <div className="sound__container-block">
                        <img
                            className="sound__image-author-favorite"
                            src={imageUrl}
                            alt="autor"
                        />
                    </div>
                    <div className="sound__name-favorite">
                        <h3>{title}</h3>
                        <h4>{author}</h4>
                    </div>
                </div>
            </div>
            <div className="sound__right">
                <p className="sound__time-favorite">{time}</p>
                <button onClick={onClickRemoveFavorite}>
                    <FaHeart className="player__left-button-red" />
                </button>
            </div>
        </div>
    );
};

export default FavoriteBlock;

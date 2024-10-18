import * as React from 'react';
import { SongObj } from '../../redux/songs/types.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { songsAction } from '../../redux/songs/slice.ts';

import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';

const SoundBlock: React.FC<SongObj> = ({
    id,
    title,
    place,
    author,
    imageUrl,
    time,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickSoundPlay = () => {
        dispatch(playlistTracksActions.setActivePlayer(false));
        dispatch(sliderAction.setActivePlayerSlide(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(songsAction.setClickPlay(true));
        dispatch(playerAction.setPlay(false));
        dispatch(playerAction.setSong({ id }));
    };

    return (
        <div className="sound__block" onClick={onClickSoundPlay}>
            <div className="sound__left">
                <h2>{place}</h2>
                <div className="sound__container-block">
                    <img
                        className="sound__image-author"
                        src={imageUrl}
                        alt="autor"
                    />
                </div>
                <div className="sound__name">
                    <h3>{title}</h3>
                    <h4>{author}</h4>
                </div>
            </div>
            <h4 className="time">{time}</h4>
        </div>
    );
};

export default SoundBlock;

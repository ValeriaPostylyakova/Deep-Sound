import * as React from 'react';
import { SongObj } from '../../redux/songs/types.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { songsAction } from '../../redux/songs/slice.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';

const CustomSongBlock: React.FC<SongObj> = ({
    currentId,
    title,
    imageUrl,
    author,
    time,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const onClickTrack = () => {
        dispatch(sliderAction.setActivePlayerSlide(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(songsAction.setClickPlay(true));
        dispatch(playerAction.setPlay(false));
        dispatch(playerAction.setSong({ id: currentId }));
    };
    return (
        <div onClick={onClickTrack} className="custom__block">
            <div className="custom__block_container">
                <div className="custom__block_info">
                    <img
                        className="custom__block_images"
                        src={imageUrl}
                        alt="song"
                    />
                    <div className="custom__block_info-container">
                        <h2>{title}</h2>
                        <h4>{author}</h4>
                    </div>
                </div>
                <div className="custom__block_time">
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomSongBlock;

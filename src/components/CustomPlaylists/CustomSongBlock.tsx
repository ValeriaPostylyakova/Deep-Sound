import * as React from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';

import { SongObj } from '../../redux/songs/types.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { songsAction } from '../../redux/songs/slice.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';

import { IoMdCloseCircleOutline } from 'react-icons/io';


const CustomSongBlock: React.FC<SongObj> = ({
    id,
    title,
    imageUrl,
    author,
    time,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickTrack = (id: number) => {
        dispatch(playlistTracksActions.setSongId({ id } as SongObj));
        dispatch(playlistTracksActions.setActivePlayer(true));
        dispatch(sliderAction.setActivePlayerSlide(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(songsAction.setClickPlay(false));
        dispatch(playerAction.setPlay(false));
    };

    const onClickDeleteTrack = (id: number) => {
        dispatch(playlistTracksActions.setRemoveTrack({ id } as SongObj));
    };

    return (
        <div className="custom__block">
            <div className="custom__block_container">
                <div
                    onClick={() => onClickTrack(id)}
                    className="custom__block_info"
                >
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
                    <button onClick={() => onClickDeleteTrack(id)}>
                        <IoMdCloseCircleOutline className="custom__block_time-delete" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomSongBlock;

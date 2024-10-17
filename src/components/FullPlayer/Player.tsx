import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { SongObj } from '../../redux/songs/types.ts';

import { IoPlaySkipForward } from 'react-icons/io5';

import ButtonPlayPause from './ButtonPlayPause.tsx';
import PlayerTracks from './PlayerTracks.tsx';
import PlayerVolume from './PlayerVolume.tsx';
import ButtonsFavoritePlus from './ButtonsFavoritePlus.tsx';
import ButtonOfsetTime from './ButtonOfsetTime.tsx';
import ButtonRepeat from './ButtonRepeat.tsx';
import { playerAction } from '../../redux/player/slice.ts';

const Player: React.FC = () => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const activePlayer = useSelector(
        (state: RootState) => state.songsReducer.activePlayer
    );
    const songs = useSelector((state: RootState) => state.songsReducer.songs);
    const song = useSelector((state: RootState) => state.playerReducer.song);

    const objSong = songs.find((obj: SongObj) => obj.id === song.id);

    const onClickNextPrev = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const classBtn: string = event.currentTarget.className;
        dispatch(playerAction.setPlay(false));
        if (classBtn === 'next') {
            dispatch(playerAction.setSong({ id: Number(song.id + 1) }));
        } else {
            dispatch(playerAction.setSong({ id: Number(song.id - 1) }));
        }
    };

    const getAutoNextSong = () => {
        dispatch(playerAction.setSong({ id: Number(song.id + 1) }));
    };

    return (
        activePlayer && (
            <div className="player">
                <div className="player__container">
                    <div className="player__left">
                        <h1>{objSong?.place}</h1>
                        <div className="player__left_container">
                            <img src={objSong?.imageUrl} alt="macan" />
                            <div className="player__left_container_info">
                                <h2>{objSong?.title}</h2>
                                <h3>{objSong?.author}</h3>
                            </div>
                        </div>
                        <ButtonsFavoritePlus objFavorite={objSong} />
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon">
                            <ButtonOfsetTime audioRef={audioRef} />
                            <button
                                className="prev"
                                onClick={(e) => onClickNextPrev(e)}
                            >
                                <IoPlaySkipForward className="button prev" />
                            </button>

                            <ButtonPlayPause audioRef={audioRef} />
                            <button
                                className="next"
                                onClick={(e) => onClickNextPrev(e)}
                            >
                                <IoPlaySkipForward className="button next" />
                            </button>
                            <ButtonRepeat />
                        </div>
                        <PlayerTracks
                            audioRef={audioRef}
                            trackRef={trackRef}
                            obj={objSong}
                            getAutoNextSong={getAutoNextSong}
                        />
                    </div>
                    <PlayerVolume audioRef={audioRef} />
                </div>
            </div>
        )
    );
};

export default Player;

import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setPlay, setSong, setLoop } from '../../redux/player/slice.ts';
import { SongObj } from '../../redux/songs/types.ts';

import { IoPlaySkipForward } from 'react-icons/io5';
import { TbRewindForward10 } from 'react-icons/tb';
import { RiRepeat2Line } from 'react-icons/ri';
import { RiRepeatOneLine } from 'react-icons/ri';

import ButtonPlayPause from './ButtonPlayPause.tsx';
import PlayerTracks from './PlayerTracks.tsx';
import PlayerVolume from './PlayerVolume.tsx';
import ButtonsFavorite from './ButtonsFavorite.tsx';

const Player: React.FC = () => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { activePlayer, songs } = useSelector(
        (state: RootState) => state.songs
    );
    const { song, loop } = useSelector((state: RootState) => state.player);

    const objSong = songs.find((obj: SongObj) => obj.id === song.id);

    const onClickNextPrev = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const classBtn: string = event.currentTarget.className;
        dispatch(setPlay(false));
        if (classBtn === 'next') {
            dispatch(setSong({ id: Number(song.id + 1) }));
        } else {
            dispatch(setSong({ id: Number(song.id - 1) }));
        }
    };

    const getAutoNextSong = () => {
        dispatch(setSong({ id: Number(song.id + 1) }));
    }

    const onClickRepeat = () => {
        dispatch(setLoop(!loop));
    };

    const onClickOfsetTime = () => {
        if (audioRef.current && 'currentTime' in audioRef.current) {
            audioRef.current.currentTime = audioRef.current?.currentTime + 10;
        }
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
                                <p>{objSong?.author}</p>
                            </div>
                        </div>
                        <ButtonsFavorite objFavorite={objSong} />
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon">
                            <button onClick={onClickOfsetTime}>
                                <TbRewindForward10 className="button" />
                            </button>
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
                            <button onClick={onClickRepeat}>
                                {loop ? (
                                    <RiRepeatOneLine className="button" />
                                ) : (
                                    <RiRepeat2Line className="button" />
                                )}
                            </button>
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

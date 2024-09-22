import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import {
    setPlay,
    setSong,
    setLoop,
    setCurrentTime,
    setTrackWidth,
} from '../redux/player/slice.ts';

import { IoPlay } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { MdOutlineReplay10 } from 'react-icons/md';
import { RiRepeat2Line } from 'react-icons/ri';
import { IoMdPause } from 'react-icons/io';
import { RiRepeatOneLine } from 'react-icons/ri';
import { ImVolumeMedium } from 'react-icons/im';

const Player: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { activePlayer, songs } = useSelector(
        (state: RootState) => state.songs
    );
    const { song, play, loop, currentTime, trackWidth } = useSelector(
        (state: RootState) => state.player
    );

    const objSong = songs.find((obj) => obj.id === song.id);

    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const getCurrentTime = (event: any) => {
        const time = event.target?.currentTime;

        const minutes: number = Number(Math.floor(time / 60));
        const seconds: number = Number(Math.floor(time - minutes * 60));
        const trackWidthSong = Number((time * 100) / event.target?.duration);

        dispatch(setTrackWidth(trackWidthSong));
        dispatch(setCurrentTime({ min: minutes, sec: seconds }));
    };

    const onClickPlay = () => {
        dispatch(setPlay(!play));

        if (!play) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
            getCurrentTime(null);
        }
    };

    const onClickNext = () => {
        dispatch(setPlay(false));
        dispatch(setSong({ id: Number(song.id + 1) }));
    };

    const onClickPrev = () => {
        dispatch(setPlay(false));
        dispatch(setSong({ id: Number(song.id - 1) }));
    };

    const onClickRepeat = () => {
        dispatch(setLoop(!loop));
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
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon">
                            <MdOutlineReplay10 className="button" />
                            <button
                                onClick={onClickPrev}
                                disabled={song.id === 0}
                            >
                                <IoPlaySkipForward className="button rotate" />
                            </button>
                            <button onClick={onClickPlay}>
                                {play ? (
                                    <IoPlay className="button" />
                                ) : (
                                    <IoMdPause className="button" />
                                )}
                            </button>
                            <button
                                onClick={onClickNext}
                                disabled={song.id === 5}
                            >
                                <IoPlaySkipForward className="button" />
                            </button>
                            <button onClick={onClickRepeat}>
                                {loop ? (
                                    <RiRepeatOneLine className="button" />
                                ) : (
                                    <RiRepeat2Line className="button" />
                                )}
                            </button>
                        </div>
                        <div className="player__center_time">
                            <p>
                                {currentTime.min}:{currentTime.sec}
                            </p>
                            <div className="player__audioTracks">
                                <span
                                    style={{ width: `${trackWidth}%` }}
                                ></span>
                            </div>
                            <audio
                                ref={audioRef}
                                src={objSong?.songUrl}
                                loop={loop}
                                autoPlay
                                onTimeUpdate={(event) => getCurrentTime(event)}
                            ></audio>
                            <p>{objSong?.time}</p>
                        </div>
                    </div>
                    <div className="player__volume">
                        <ImVolumeMedium className="button" />
                        <input type="range" />
                    </div>
                </div>
            </div>
        )
    );
};

export default Player;

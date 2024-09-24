import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import {
    setPlay,
    setSong,
    setLoop,
    setCurrentTime,
    setTrackWidth,
    setVolume,
} from '../redux/player/slice.ts';

import { IoPlay } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { MdOutlineReplay10 } from 'react-icons/md';
import { RiRepeat2Line } from 'react-icons/ri';
import { IoMdPause } from 'react-icons/io';
import { RiRepeatOneLine } from 'react-icons/ri';
import { _volumeImg } from '../viteImages/images.ts';
import { volume_mute } from '../viteImages/images.ts';

const Player: React.FC = () => {
    const [volumeState, setVolumeState] = React.useState<number>(30);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { activePlayer, songs } = useSelector(
        (state: RootState) => state.songs
    );
    const { song, play, loop, currentTime, trackWidth, volume } = useSelector(
        (state: RootState) => state.player
    );

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const onChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(Number(event.target.value)));
        setVolumeState(Number(event.target.value));
    };

    const objSong = songs.find((obj) => obj.id === song.id);

    const onClickPlay = () => {
        dispatch(setPlay(!play));

        if (!play) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
            getCurrentTime();
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

    const getCurrentTime = () => {
        if (audioRef.current) {
            const time = audioRef.current.currentTime;

            const minutes = Number(Math.floor(time / 60));
            const second: number = Number(Math.floor(time - minutes * 60));
            const seconds: number | string =
                second < 10 ? `0${second}` : second;
            const trackWidthSong = Number(
                (time / audioRef.current.duration) * 100
            );

            dispatch(setTrackWidth(trackWidthSong));
            dispatch(setCurrentTime({ min: minutes, sec: seconds }));
        }
    };

    const onClickTracks = (event: React.MouseEvent) => {
        if (audioRef.current) {
            const width = Number(trackRef.current?.clientWidth);
            const offset = Number(event.nativeEvent.offsetX);
            const progress = (offset / width) * 100;
            audioRef.current.currentTime =
                (progress / 100) * audioRef.current.duration;
        }
    };

    const onClickOfsetTime = () => {
        if (audioRef.current) {
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
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon">
                            <button onClick={onClickOfsetTime}>
                                <MdOutlineReplay10 className="button" />
                            </button>
                            <button
                                onClick={onClickPrev}
                                disabled={song.id === 0}
                            >
                                <IoPlaySkipForward className="button prev" />
                            </button>
                            <button
                                onClick={onClickPlay}
                                className="player__button-play"
                            >
                                {play ? (
                                    <IoPlay className="button play" />
                                ) : (
                                    <IoMdPause className="button play" />
                                )}
                            </button>
                            <button
                                onClick={onClickNext}
                                disabled={song.id === 5}
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
                        <div className="player__center_time">
                            <p className="player__center_time_text">
                                {currentTime.min}:{currentTime.sec}
                            </p>
                            <div
                                onClick={onClickTracks}
                                className="player__audioTracks"
                                ref={trackRef}
                            >
                                <span
                                    style={{ width: `${trackWidth}%` }}
                                ></span>
                            </div>

                            <audio
                                ref={audioRef}
                                src={objSong?.songUrl}
                                loop={loop}
                                autoPlay
                                onTimeUpdate={getCurrentTime}
                            ></audio>
                            <p className="player__center_time_text">
                                {objSong?.time}
                            </p>
                        </div>
                    </div>
                    <div className="player__volume">
                        {volumeState !== 0 ? (
                            <img
                                className="button"
                                src={_volumeImg}
                                alt="volume"
                            />
                        ) : (
                            <img
                                className="button"
                                src={volume_mute}
                                alt="volume-mute"
                            />
                        )}
                        <input
                            min={0}
                            max={100}
                            value={volume}
                            onChange={onChangeVolume}
                            type="range"
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default Player;

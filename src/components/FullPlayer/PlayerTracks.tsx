import * as React from 'react';
import { MutableRefObject } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { SongObj } from '../../redux/songs/types.ts';
import { setCurrentTime, setTrackWidth } from '../../redux/player/slice.ts';

type PlayerTracksProps = {
    audioRef: MutableRefObject<HTMLAudioElement | null>;
    trackRef: MutableRefObject<HTMLDivElement | null>;
    obj: SongObj | undefined;
    getAutoNextSong?: () => void;
};

const PlayerTracks: React.FC<PlayerTracksProps> = ({
    audioRef,
    trackRef,
    obj,
    getAutoNextSong
}) => {
    const dispatch: AppDispatch = useDispatch();

    const { loop, currentTime, trackWidth } = useSelector(
        (state: RootState) => state.player
    );

    const getCurrentTime = () => {
        if (audioRef.current && 'currentTime' in audioRef.current) {
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
        if (audioRef.current && 'currentTime' in audioRef.current) {
            const width = Number(trackRef.current?.clientWidth);
            const offset = Number(event.nativeEvent.offsetX);
            const progress = (offset / width) * 100;
            audioRef.current.currentTime =
                (progress / 100) * audioRef.current.duration;
        }
    };

    return (
        <div className="player__center_time">
            <p className="player__center_time_text">
                {currentTime.min}:{currentTime.sec}
            </p>
            <div
                onClick={onClickTracks}
                className="player__audioTracks"
                ref={trackRef}
            >
                <span style={{ width: `${trackWidth}%` }}></span>
            </div>

            <audio
                onEnded={getAutoNextSong}
                ref={audioRef}
                src={obj?.songUrl}
                loop={loop}
                autoPlay
                onTimeUpdate={getCurrentTime}
            ></audio>
            <p className="player__center_time_text">{obj?.time}</p>
        </div>
    );
};

export default PlayerTracks;

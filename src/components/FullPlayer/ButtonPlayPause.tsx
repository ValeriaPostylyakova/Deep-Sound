import * as React from 'react';
import { MutableRefObject } from 'react';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setPlay } from '../../redux/player/slice.ts';

import { IoPlay } from 'react-icons/io5';
import { IoMdPause } from 'react-icons/io';

type PlayPauseProps = {
    audioRef: MutableRefObject<HTMLAudioElement | null>;
};

const ButtonPlayPause: React.FC<PlayPauseProps> = ({ audioRef }) => {
    const dispatch: AppDispatch = useDispatch();

    const { isPlay } = useSelector((state: RootState) => state.player);

    const onClickPlayPause = () => {
        dispatch(setPlay(!isPlay));

        if (!isPlay) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
    };

    return (
        <button onClick={onClickPlayPause} className="player__button-play">
            {isPlay ? (
                <IoPlay className="button play" />
            ) : (
                <IoMdPause className="button play" />
            )}
        </button>
    );
};

export default ButtonPlayPause;

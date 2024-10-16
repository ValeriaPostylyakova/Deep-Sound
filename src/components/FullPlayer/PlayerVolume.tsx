import * as React from 'react';
import { MutableRefObject } from 'react';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

import { playerAction } from '../../redux/player/slice.ts';
import { IoVolumeMediumSharp } from 'react-icons/io5';
import { IoMdVolumeOff } from 'react-icons/io';

type PlayerVolumeProps = {
    audioRef: MutableRefObject<HTMLAudioElement | null>;
};

const PlayerVolume: React.FC<PlayerVolumeProps> = ({ audioRef }) => {
    const dispatch: AppDispatch = useDispatch();
    const volume = useSelector(
        (state: RootState) => state.playerReducer.volume
    );
    const [volumeState, setVolumeState] = React.useState<number>(30);
    const onChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(playerAction.setVolume(Number(event.target.value)));
        setVolumeState(Number(event.target.value));
    };

    React.useEffect(() => {
        if (audioRef.current) {
            if ('volume' in audioRef.current) {
                audioRef.current.volume = volume / 100;
            }
        }
    }, [volume]);

    return (
        <div className="player__volume">
            {volumeState > 0 ? (
                <IoVolumeMediumSharp className="button-volume" />
            ) : (
                <IoMdVolumeOff className="button-volume" />
            )}
            <input
                min={0}
                max={100}
                value={volume}
                onChange={onChangeVolume}
                type="range"
            />
        </div>
    );
};

export default PlayerVolume;

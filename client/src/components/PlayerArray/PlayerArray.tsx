import * as React from 'react';
import { SongObj } from '../../redux/songs/types.ts';

import ButtonPlayPause from '../FullPlayerObj/ButtonPlayPause.tsx';
import PlayerTracks from '../FullPlayerObj/PlayerTracks.tsx';
import PlayerVolume from '../FullPlayerObj/PlayerVolume.tsx';
import ButtonOfsetTime from '../FullPlayerObj/ButtonOfsetTime.tsx';
import ButtonRepeat from '../FullPlayerObj/ButtonRepeat.tsx';
import ButtonsFavoritePlus from '../FullPlayerObj/ButtonsFavoritePlus.tsx';

import { IoPlaySkipForward } from 'react-icons/io5';

type PlayerProps = {
    sliceArray: SongObj[];
    songIndex: number;
};

const PlayerArray: React.FC<PlayerProps> = ({ sliceArray, songIndex }) => {
    const [song, setSong] = React.useState<SongObj | undefined>();

    const audioSliderRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const obj = sliceArray[songIndex];

    React.useEffect(() => {
        setSong(obj);
    }, [obj]);

    const index = sliceArray.findIndex((obj: SongObj) => obj.id === song?.id);

    const onClickNextPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        const classBtn = event.currentTarget.className;
        if (classBtn === 'next') {
            setSong(sliceArray[index + 1]);
        } else {
            setSong(sliceArray[index - 1]);
        }
    };

    const getAutoNextSong = () => {
        return setSong(sliceArray[index + 1]);
    };

    return (
        <div className="player__container">
            <div className="player__left">
                <div className="player__left_container">
                    <img src={song?.imageUrl} alt="author" />
                    <div className="player__left_container_info">
                        <h2>{song?.title}</h2>
                        <h3>{song?.author}</h3>
                    </div>
                    <div className="player__left_buttons">
                        <ButtonsFavoritePlus objFavorite={song} />
                    </div>
                </div>
            </div>
            <div className="player__center">
                <div className="player__center_icon_slider">
                    <ButtonOfsetTime audioRef={audioSliderRef} />
                    <button
                        disabled={index === 0}
                        className="prev"
                        onClick={(e) => onClickNextPrev(e)}
                    >
                        <IoPlaySkipForward className="button prev" />
                    </button>

                    <ButtonPlayPause audioRef={audioSliderRef} />
                    <button
                        disabled={index === 4}
                        onClick={(e) => onClickNextPrev(e)}
                        className="next"
                    >
                        <IoPlaySkipForward className="button next" />
                    </button>
                    <ButtonRepeat />
                </div>
                <PlayerTracks
                    audioRef={audioSliderRef}
                    trackRef={trackRef}
                    getAutoNextSong={getAutoNextSong}
                    obj={song}
                />
            </div>
            <PlayerVolume audioRef={audioSliderRef} />
        </div>
    );
};

export default PlayerArray;

import * as React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import ButtonPlayPause from './FullPlayer/ButtonPlayPause.tsx';
import PlayerTracks from './FullPlayer/PlayerTracks.tsx';
import PlayerVolume from './FullPlayer/PlayerVolume.tsx';

import { IoPlaySkipForward } from 'react-icons/io5';
import { GrFavorite } from 'react-icons/gr';
import { FiPlus } from 'react-icons/fi';
import { SongObj } from '../redux/songs/types.ts';

const PlayerSlider = () => {
    const { activePlayerSlide, slideFilterData } = useSelector(
        (state: RootState) => state.slider
    );

    const [song, setSong] = React.useState<SongObj | undefined>();
    const audioSliderRef = React.useRef<HTMLAudioElement | null>(null);
    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const obj = slideFilterData[0];

    React.useEffect(() => {
        setSong(obj);
    }, [obj]);

    const index = slideFilterData.findIndex((obj) => obj.id === song?.id);

    const onClickNextPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        const classBtn = event.currentTarget.className;
        if (classBtn === 'next') {
            return setSong(slideFilterData[index + 1]);
        } else {
            return setSong(slideFilterData[index - 1]);
        }
    };

    return (
        activePlayerSlide && (
            <div className="player">
                <div className="player__container">
                    <div className="player__left">
                        <div className="player__left_container">
                            <img src={song?.imageUrl} alt="author" />
                            <div className="player__left_container_info">
                                <h2>{song?.title}</h2>
                                <p>{song?.author}</p>
                            </div>
                            <div className="player__left_buttons">
                                <button>
                                    <GrFavorite className="player__left-button" />
                                </button>
                                <button>
                                    <FiPlus className="player__left-button" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon_slider">
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
                        </div>
                        <PlayerTracks
                            audioRef={audioSliderRef}
                            trackRef={trackRef}
                            obj={song}
                        />
                    </div>
                    <PlayerVolume audioRef={audioSliderRef} />
                </div>
            </div>
        )
    );
};

export default PlayerSlider;

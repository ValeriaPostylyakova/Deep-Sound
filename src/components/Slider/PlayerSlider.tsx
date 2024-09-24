// import { MdOutlineReplay10 } from 'react-icons/md';
import { IoPlay, IoPlaySkipForward } from 'react-icons/io5';
// import { IoMdPause } from 'react-icons/io';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { _volumeImg } from '../../viteImages/images.ts';

const PlayerSlider = () => {
    const [song, setSong] = React.useState({
        id: 0,
        title: "It's My Life",
        author: 'Дима Билан, Мари Краймб',
        imageUrl: '/song-14.webp',
        songUrl:
            '../assets/mp3/macan-avg-all-i-need-is-your-love-tonight-mp3.mp3',
    });
    const { activePlayerSlide, slideFilterData } = useSelector(
        (state: RootState) => state.slider
    );

    const obj = slideFilterData[0];

    React.useEffect(() => {
        setSong(obj);
    }, [obj]);

    const onClickSliderNext = () => {
        const nextObj = slideFilterData.find(
            (objFull) => objFull.id === obj.id + 1
        );

        setSong(nextObj);
    };

    const onClickSliderPrev = () => {
        const prevObj = slideFilterData.find(
            (objFull) => objFull.id === obj.id - 1
        );

        setSong(prevObj);
    };

    return (
        activePlayerSlide && (
            <div className="player">
                <div className="player__container">
                    <div className="player__left">
                        <div className="player__left_container">
                            <img src={song?.imageUrl} alt="macan" />
                            <div className="player__left_container_info">
                                <h2>{song?.title}</h2>
                                <p>{song?.author}</p>
                            </div>
                        </div>
                    </div>
                    <div className="player__center">
                        <div className="player__center_icon_slider">
                            <button onClick={onClickSliderPrev}>
                                <IoPlaySkipForward className="button prev" />
                            </button>
                            <button className="player__button-play">
                                <IoPlay className="button play" />
                                {/*<IoMdPause className="button play" />*/}
                            </button>
                            <button onClick={onClickSliderNext}>
                                <IoPlaySkipForward className="button next" />
                            </button>
                        </div>
                        <div className="player__center_time">
                            <p className="player__center_time_text">
                                {0}:{0}
                            </p>
                            <div className="player__audioTracks">
                                <span></span>
                            </div>

                            <audio autoPlay src="/"></audio>
                            <p className="player__center_time_text">0:0</p>
                        </div>
                    </div>
                    <div className="player__volume">
                        <img className="button" src={_volumeImg} alt="volume" />
                        <input min={0} max={100} type="range" />
                    </div>
                </div>
            </div>
        )
    );
};

export default PlayerSlider;

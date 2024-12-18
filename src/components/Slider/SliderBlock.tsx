import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/scss';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';

import { fetchSlider } from '../../redux/sliderPlayer/asyncAction.ts';
import { DataObj } from '../../redux/sliderPlayer/types.ts';
import { songsAction } from '../../redux/songs/slice.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';

import { slides } from './json.ts';
import NavButtons from './NavButtons.tsx';
import { IoPlay } from 'react-icons/io5';

const SliderBlock: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSlider());
    }, [dispatch]);

    const onClickSlide = (id: number) => {
        dispatch(sliderAction.setSliderId({ id } as DataObj));
        dispatch(songsAction.setClickPlay(false));
        dispatch(playlistAction.setPlayerActive(false));
        dispatch(playlistTracksActions.setActivePlayer(false));
        dispatch(sliderAction.setActivePlayerSlide(true));
    };

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div key={index} className={`slider ${slide.className}`}>
                        <div className="slider__container">
                            <div onClick={() => onClickSlide(slide.id)}>
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <div className="slider__container-bottom">
                                    <button className="slider__container-bottom-buttons">
                                        <IoPlay className="buttons_play" />
                                    </button>
                                </div>
                            </div>
                            <NavButtons />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderBlock;

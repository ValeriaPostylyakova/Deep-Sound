import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';

import { Swiper, SwiperSlide } from 'swiper/react';
import { IoPlay } from 'react-icons/io5';
import { IoMdPause } from 'react-icons/io';
import { Navigation, Autoplay } from 'swiper/modules';

import { slides } from './json.ts';
import NavButtons from './NavButtons.tsx';

import 'swiper/scss';
import {
    setSliderId,
    setActivePlayerSlide,
} from '../../redux/sliderPlayer/slice.ts';
import { setClickPlay } from '../../redux/songs/slice.ts';

import { DataObj } from '../../redux/sliderPlayer/types.ts';
import { setPlayerActive } from '../../redux/playlistPlayer/slice.ts';
import { fetchSlider } from '../../redux/sliderPlayer/asyncAction.ts';

const SliderBlock: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isPlay } = useSelector((state: RootState) => state.player);

    React.useEffect(() => {
        dispatch(fetchSlider());
    }, []);

    const onClickSlide = (id: number) => {
        dispatch(setSliderId({ id } as DataObj));
        dispatch(setClickPlay(false));
        dispatch(setPlayerActive(false));
        dispatch(setActivePlayerSlide(true));
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
                                    <button className="play">
                                        {isPlay ? (
                                            <IoMdPause className="slider__container-bottom-buttons" />
                                        ) : (
                                            <IoPlay className="slider__container-bottom-buttons" />
                                        )}
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

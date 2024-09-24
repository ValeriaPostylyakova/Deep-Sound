import * as React from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { slides } from './json.ts';
import NavButtons from './NavButtons.tsx';

import { play } from '../../viteImages/images.ts';
import 'swiper/scss';
import {
    setDataSongs,
    setSliderId,
    setActivePlayerSlide,
} from '../../redux/slider/slice.ts';
import { setClickPlay } from '../../redux/songs/slice.ts';

import { DataObj } from '../../redux/slider/types.ts';

const SliderBlock: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        const dataSlider = async () => {
            const { data } = await axios.get(
                'https://985cc4acb156d262.mokky.dev/slider'
            );
            dispatch(setDataSongs(data));
        };

        dataSlider();
    }, []);

    const onClickPlaySlider = (id: number) => {
        dispatch(setSliderId({ id } as DataObj));
        dispatch(setClickPlay(false));
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
                <SwiperSlide
                    key={index}
                    onClick={() => onClickPlaySlider(slide.id)}
                >
                    <div key={index} className={`slider ${slide.className}`}>
                        <div className={slide.className}></div>
                        <div className="slider__container">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <div className="slider__container-bottom">
                                <button className="play">
                                    <img src={play} alt="play" />
                                </button>
                                <NavButtons />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderBlock;

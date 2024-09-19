import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { slides } from './json.ts';
import NavButtons from './NavButtons.tsx';

import { play } from '../../viteImages/images.ts';
import 'swiper/scss';

type SliderProps = {
    setActivePlayer: (activePlayer: boolean) => void;
};

const SliderBlock: React.FC<SliderProps> = ({ setActivePlayer }) => {
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
                        <div className={slide.className}></div>
                        <div className="slider__container">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <div className="slider__container-bottom">
                                <button
                                    onClick={() => setActivePlayer(true)}
                                    className="play"
                                >
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

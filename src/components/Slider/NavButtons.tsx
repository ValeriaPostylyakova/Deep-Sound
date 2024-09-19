import { arrow } from '../../viteImages/images.ts';
import * as React from 'react';
import { useSwiper } from 'swiper/react';

const NavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="slider__right-container">
            <button onClick={() => swiper.slidePrev()} className="button">
                <img src={arrow} alt="arrow" />
            </button>
            <button onClick={() => swiper.slideNext()} className="button_2">
                <img src={arrow} alt="arrow" />
            </button>
        </div>
    );
};

export default NavButtons;

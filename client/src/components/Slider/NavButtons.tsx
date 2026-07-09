import { useSwiper } from 'swiper/react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const NavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="slider__right-container">
            <button onClick={() => swiper.slidePrev()} className="button">
                <IoIosArrowBack style={{ color: '#000000' }} />
            </button>
            <button onClick={() => swiper.slideNext()} className="button_2">
                <IoIosArrowForward style={{ color: '#000000' }} />
            </button>
        </div>
    );
};

export default NavButtons;

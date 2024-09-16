import playImg from '../assets/img/play.svg';
import arrowImg from '../assets/img/arrow.svg';

const play: string = String(playImg);
const arrow: string = String(arrowImg);

const Slider = () => {
    return (
        <section className="slider">
            <div className="slider__container">
                <h1>Плейлист дня</h1>
                <p>Каждый день - новый! Каждый день - ваш!</p>
                <div className="slider__container-bottom">
                    <div className="play">
                        <img src={play} alt="play" />
                    </div>

                    <div className="slider__right-container">
                        <div className="button">
                            <img src={arrow} alt="arrow" />
                        </div>
                        <div className="button_2">
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slider;

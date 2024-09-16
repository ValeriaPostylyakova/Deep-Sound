import popImg from '../assets/img/genres/popImg.png';
import metalImg from '../assets/img/genres/metalImg.png';
import indieImg from '../assets/img/genres/indieImg.png';
import alternativeImg from '../assets/img/genres/alternativeImg.png';
import rockImg from '../assets/img/genres/rockImg.png';

const pop: string = String(popImg);
const metal: string = String(metalImg);
const indie: string = String(indieImg);
const alternative: string = String(alternativeImg);
const rock: string = String(rockImg);

const GenresBlock = () => {
    return (
        <>
            <a className="genres__link" href="/">
                <div className="genres__playlist">
                    <img src={pop} alt="pop" />
                    <div className="genres__active"></div>
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="genres__playlist">
                    <img src={rock} alt="rock" />
                    <div className="genres__active"></div>
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="genres__playlist">
                    <img src={indie} alt="indie" />
                    <div className="genres__active"></div>
                </div>
            </a>
            <a className="genres__link" href="/">
                <div className="genres__playlist">
                    <img src={metal} alt="metal" />
                    <div className="genres__active"></div>
                </div>
            </a>
            <a className="genres__link genres-5" href="">
                <div className="genres__playlist">
                    <img src={alternative} alt="alternative" />
                    <div className="genres__active"></div>
                </div>
            </a>
        </>
    );
};

export default GenresBlock;

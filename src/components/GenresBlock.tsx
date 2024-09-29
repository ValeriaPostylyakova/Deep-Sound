import { pop, rock, indie, alternative, metal } from '../viteImages/images.ts';

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
            <a className="genres__link genres-5" href="/">
                <div className="genres__playlist">
                    <img src={alternative} alt="alternative" />
                    <div className="genres__active"></div>
                </div>
            </a>
        </>
    );
};

export default GenresBlock;

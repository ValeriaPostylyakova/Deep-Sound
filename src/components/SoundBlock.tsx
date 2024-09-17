import * as React from 'react';

import { sound, play18, pause18 } from '../viteImages/images.ts';

const SoundBlock = () => {
    const [activeImg, setActiveImg] = React.useState<boolean>(false);

    const onClickPlay = () => {
        setActiveImg(!activeImg);
    };

    return (
        <div className="sound__block">
            <div className="sound__left">
                <h2>1</h2>
                <button
                    onClick={onClickPlay}
                    className="sound__container-block"
                >
                    <img src={sound} alt="autor" />
                    <div className="sound__play-container">
                        {activeImg ? (
                            <img src={pause18} alt="pause" />
                        ) : (
                            <img src={play18} alt="play" />
                        )}
                    </div>
                </button>
                <div className="sound__name">
                    <h3>Привыкаю</h3>
                    <p>Macan, A.V.G</p>
                </div>
            </div>
            <p className="time">2:54</p>
        </div>
    );
};

export default SoundBlock;

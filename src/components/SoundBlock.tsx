import * as React from 'react';
import { SongObj } from '../redux/songs/types.ts';

import { play18, pause18 } from '../viteImages/images.ts';

const SoundBlock: React.FC<SongObj> = ({ title, place, author, imageUrl }) => {
    const [activeImg, setActiveImg] = React.useState<boolean>(false);

    const onClickPlay = () => {
        setActiveImg(!activeImg);
    };

    return (
        <div className="sound__block">
            <div className="sound__left">
                <h2>{place}</h2>
                <button
                    onClick={onClickPlay}
                    className="sound__container-block"
                >
                    <img
                        className="sound__image-author"
                        src={imageUrl}
                        alt="autor"
                    />
                    <div className="sound__play-container">
                        {activeImg ? (
                            <img src={pause18} alt="pause" />
                        ) : (
                            <img src={play18} alt="play" />
                        )}
                    </div>
                </button>
                <div className="sound__name">
                    <h3>{title}</h3>
                    <p>{author}</p>
                </div>
            </div>
            <p className="time">2:54</p>
        </div>
    );
};

export default SoundBlock;

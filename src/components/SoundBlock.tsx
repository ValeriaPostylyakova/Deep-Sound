import * as React from 'react';
import { SongObj } from '../redux/songs/types.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { setClickPlay } from '../redux/songs/slice.ts';
import { setSong } from '../redux/player/slice.ts';
import { setPlay } from '../redux/player/slice.ts';

const SoundBlock: React.FC<SongObj> = ({
    id,
    title,
    place,
    author,
    imageUrl,
    time,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickSoundPlay = () => {
        dispatch(setClickPlay(true));
        dispatch(setPlay(false));
        dispatch(setSong({ id }));
    };

    return (
        <div className="sound__block" onClick={onClickSoundPlay}>
            <div className="sound__left">
                <h2>{place}</h2>
                <div className="sound__container-block">
                    <img
                        className="sound__image-author"
                        src={imageUrl}
                        alt="autor"
                    />
                </div>
                <div className="sound__name">
                    <h3>{title}</h3>
                    <p>{author}</p>
                </div>
            </div>
            <p className="time">{time}</p>
        </div>
    );
};

export default SoundBlock;

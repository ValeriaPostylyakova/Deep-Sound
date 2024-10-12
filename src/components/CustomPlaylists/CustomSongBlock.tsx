import * as React from 'react';
import { SongObj } from '../../redux/songs/types.ts';

const CustomSongBlock: React.FC<SongObj> = ({
    title,
    imageUrl,
    author,
    time,
}) => {
    return (
        <div className="custom__block">
            <div className="custom__block_container">
                <div className="custom__block_info">
                    <img
                        className="custom__block_images"
                        src={imageUrl}
                        alt="song"
                    />
                    <div className="custom__block_info-container">
                        <h2>{title}</h2>
                        <h4>{author}</h4>
                    </div>
                </div>
                <div className="custom__block_time">
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomSongBlock;

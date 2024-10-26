import * as React from 'react';

import favorite1Img from '../assets/favorite-1.png';
const favorite1: string = String(favorite1Img);

type EmptyBlock = {
    title: string;
};

const EmptyBlock: React.FC<EmptyBlock> = ({
    title,
}) => {
    return (
        <div className="favorite__container_1">
            <div className="favorite__title-container">
                <img
                    src={favorite1}
                    className="favorite__icon"
                    alt="favorite"
                />
                <p className="favorite__title">{title}</p>
            </div>
        </div>
    );
};

export default EmptyBlock;

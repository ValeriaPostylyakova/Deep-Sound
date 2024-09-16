import * as React from 'react';

import arrow2Img from '../assets/img/arrow2.svg';
const arrow2: string = String(arrow2Img);

type TitleProps = {
    text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <div className="main__title">
            <h1>{text}</h1>
            <img className="active-arrow" src={arrow2} alt="arrow" />
        </div>
    );
};

export default Title;

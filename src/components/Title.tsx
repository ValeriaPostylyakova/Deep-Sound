import * as React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type TitleProps = {
    text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <div className="main__title">
            <h1>{text}</h1>
            <IoIosArrowForward className="main__title_icon" />
        </div>
    );
};

export default Title;

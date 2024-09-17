import * as React from 'react';

import { arrow2 } from '../viteImages/images.ts';

type TitleProps = {
    text: string;
    getImg: boolean;
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

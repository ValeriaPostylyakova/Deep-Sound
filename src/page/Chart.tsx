import * as React from 'react';
import SoundBlock from '../components/SoundBlock.tsx';

import Title from '../components/Title.tsx';

const Chart = () => {
    return (
        <>
            <Title text="Чарт DEEP SOUND" />
            <div className="chart__container">
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
                <SoundBlock />
            </div>
        </>
    );
};

export default Chart;

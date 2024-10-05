import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import PlayerArray from './PlayerArray.tsx';

const PlayerSlider = () => {
    const { activePlayerSlide, slideFilterData } = useSelector(
        (state: RootState) => state.slider
    );

    return (
        activePlayerSlide && (
            <div className="player">
                <PlayerArray sliceArray={slideFilterData}/>
            </div>
        )
    );
};

export default PlayerSlider;

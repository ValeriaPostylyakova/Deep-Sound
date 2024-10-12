import { FiPlus } from 'react-icons/fi';
import { playerAction } from '../../redux/player/slice.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

const ButtonPlus = () => {
    const dispatch: AppDispatch = useDispatch();

    const addedSong = useSelector(
        (state: RootState) => state.playerReducer.addedSong
    );

    const onClickAddedSong = () => {
        dispatch(playerAction.setAddedSong(!addedSong));
    };

    return (
        <button onClick={onClickAddedSong}>
            <FiPlus className="player__left-button" />
        </button>
    );
};

export default ButtonPlus;

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { playerAction } from '../../redux/player/slice.ts';
import { RiRepeat2Line, RiRepeatOneLine } from 'react-icons/ri';

const ButtonRepeat = () => {
    const dispatch: AppDispatch = useDispatch();

    const loop = useSelector((state: RootState) => state.playerReducer.loop);
    const onClickRepeat = () => {
        dispatch(playerAction.setLoop(!loop));
    };

    return (
        <button onClick={onClickRepeat}>
            {loop ? (
                <RiRepeatOneLine className="button" />
            ) : (
                <RiRepeat2Line className="button" />
            )}
        </button>
    );
};

export default ButtonRepeat;

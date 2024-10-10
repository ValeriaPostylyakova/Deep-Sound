import { RiRepeat2Line, RiRepeatOneLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { playerAction } from '../../redux/player/slice.ts';

const ButtonRepeat = () => {
    const dispatch: AppDispatch = useDispatch();

    const { loop } = useSelector((state: RootState) => state.playerReducer);
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

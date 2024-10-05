import { RiRepeat2Line, RiRepeatOneLine } from 'react-icons/ri';
import { setLoop } from '../../redux/player/slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';

const ButtonRepeat = () => {
    const dispatch: AppDispatch = useDispatch();

    const { loop } = useSelector((state: RootState) => state.player);
    const onClickRepeat = () => {
        dispatch(setLoop(!loop));
    };

    return (
        <button onClick={onClickRepeat}>
            {loop ? (
                <RiRepeatOneLine className="button" />
            ) : (
                <RiRepeat2Line className="button" />
            )}
        </button>
    )
}

export default ButtonRepeat
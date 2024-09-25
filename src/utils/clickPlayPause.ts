import { setPlay } from '../redux/player/slice.ts';

export const onClickPlayPause = (state, audio, dispatch, setPlay) => {
    dispatch(setPlay(!state));
    if (!state) {
        audio.current?.pause();
    } else {
        audio.current?.play();
    }
};

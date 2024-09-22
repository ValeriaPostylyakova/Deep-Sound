import { setPlaySong } from '../redux/songs/slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';

const dispatch: AppDispatch = useDispatch();

const { playSong } = useSelector((state: RootState) => state.songs);

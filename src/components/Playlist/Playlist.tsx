import * as React from 'react';

import { SongObj } from '../../redux/songs/types.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import {
    setPlayerActive,
    setPlaylist,
} from '../../redux/playlistPlayer/slice.ts';
import { setClickPlay } from '../../redux/songs/slice.ts';
import { setActivePlayerSlide } from '../../redux/sliderPlayer/slice.ts';

type PlaylistProps = {
    imageUrl: string;
    title: string;
    songs: SongObj[];
    key?: number;
};

const Playlist: React.FC<PlaylistProps> = ({ imageUrl, title, songs }) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickPlaylist = () => {
        dispatch(setPlayerActive(true));
        dispatch(setPlaylist(songs));
        dispatch(setClickPlay(false));
        dispatch(setActivePlayerSlide(false));
    };

    return (
        <div onClick={onClickPlaylist} className="playlist">
            <div className="playlist__container-top">
                <img
                    className="playlist__images"
                    src={imageUrl}
                    alt="playlist"
                />
                <h3 className="playlist__title">{title}</h3>
            </div>
            <h4 className="playlist__collection">
                {songs.length <= 4
                    ? songs.length + ' трека'
                    : songs.length + ' треков'}
            </h4>
        </div>
    );
};

export default Playlist;

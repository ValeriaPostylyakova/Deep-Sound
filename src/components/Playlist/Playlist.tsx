import * as React from 'react';

import { SongObj } from '../../redux/songs/types.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

import { songsAction } from '../../redux/songs/slice.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';

type PlaylistProps = {
    imageUrl: string;
    title: string;
    songs: SongObj[];
    key?: number;
};

const Playlist: React.FC<PlaylistProps> = ({ imageUrl, title, songs }) => {
    const dispatch: AppDispatch = useDispatch();
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    const onClickPlaylist = () => {
        dispatch(playlistAction.setPlayerActive(true));
        dispatch(playlistAction.setPlaylist(songs));
        dispatch(songsAction.setClickPlay(false));
        dispatch(sliderAction.setActivePlayerSlide(false));
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
                {playlistTracks.length <= 4
                    ? playlistTracks.length + ' трека'
                    : playlistTracks.length + ' треков'}
            </h4>
        </div>
    );
};

export default Playlist;

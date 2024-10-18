import * as React from 'react';

import { SongObj } from '../../redux/songs/types.ts';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';

import { songsAction } from '../../redux/songs/slice.ts';
import { sliderAction } from '../../redux/sliderPlayer/slice.ts';
import { playlistAction } from '../../redux/playlistPlayer/slice.ts';
import { playlistTracksActions } from '../../redux/createPlaylistTracks/slice.ts';

type PlaylistProps = {
    parentId?: number;
    imageUrl: string;
    title: string;
    songs: SongObj[];
    key?: number;
};

const Playlist: React.FC<PlaylistProps> = ({ imageUrl, title, songs }) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickPlaylist = () => {
        dispatch(playlistAction.setPlayerActive(true));
        dispatch(playlistAction.setPlaylist(songs));
        dispatch(songsAction.setClickPlay(false));
        dispatch(playlistTracksActions.setActivePlayer(false));
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
                {songs.length <= 4
                    ? songs.length + ' трека'
                    : songs.length + ' треков'}
            </h4>
        </div>
    );
};

export default Playlist;

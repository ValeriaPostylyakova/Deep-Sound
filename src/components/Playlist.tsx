import * as React from 'react';

import { SongObj } from '../redux/songs/types.ts';

type PlaylistProps = {
    imageUrl: string;
    title: string;
    songs: SongObj[];
    key?: number;
};

const Playlist: React.FC<PlaylistProps> = ({ imageUrl, title, songs }) => {
    return (
        <div className="playlist">
            <div className="playlist__container-top">
                <img className="playlist__images" src={imageUrl} alt="alt" />
                <h3 className="playlist__title">{title}</h3>
            </div>
            <h4 className="playlist__collection">{songs.length} трека</h4>
        </div>
    );
};

export default Playlist;

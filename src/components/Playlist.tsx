import * as React from 'react';
import { PlaylistObj } from '../redux/genres/types.ts';
import { SongObj } from '../redux/songs/types.ts';

type PlaylistProps = {
    // playlists: PlaylistObj;
    imageUrl: string;
    title: string;
    songs: SongObj[];
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

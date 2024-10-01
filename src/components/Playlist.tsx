import * as React from 'react';
import { PlaylistObj } from '../redux/genres/types.ts';

type PlaylistProps = {
    playlists: PlaylistObj[];
};

const Playlist: React.FC<PlaylistProps> = ({ playlists }) => {
    return (
        <div className="genres__item-playlists">
            {playlists?.map((playlist) => (
                <div key={playlist.id} className="playlist">
                    <div className="playlist__container-top">
                        <img
                            className="playlist__images"
                            src={playlist.imageUrl}
                            alt="alt"
                        />
                        <h3 className="playlist__title">{playlist.title}</h3>
                    </div>
                    <h4 className="playlist__collection">
                        {playlist.songs.length} треков
                    </h4>
                </div>
            ))}
        </div>
    );
};

export default Playlist;

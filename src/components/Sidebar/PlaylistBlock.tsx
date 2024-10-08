import { FaMusic } from 'react-icons/fa6';
import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SongObj } from '../../redux/songs/types.ts';

type CustomPlaylist = {
    id: number;
    parentId: string;
    songs: SongObj[];
    title: string;
};

const PlaylistBlock = () => {
    const [playlists, setPlaylits] = React.useState([]);

    React.useEffect(() => {
        async function fetchPlaylists() {
            try {
                const { data } = await axios.get(
                    'https://985cc4acb156d262.mokky.dev/createPlaylist'
                );

                setPlaylits(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchPlaylists();
    }, []);

    return (
        <div className="sidebar__playlists">
            {playlists.map((playlist: CustomPlaylist) => (
                <Link to={`/custom-playlist/${playlist.parentId}`}>
                    <div key={playlist.id} className="sidebar__playlist">
                        <div className="sidebar__playlist-container">
                            <div className="sidebar__playlist-images">
                                <FaMusic className="sidebar__playlist-images_icon" />
                            </div>
                            <div className="sidebar__playlist_info">
                                <h3>{playlist.title}</h3>
                                <h4>{playlist.songs.length} треков</h4>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PlaylistBlock;

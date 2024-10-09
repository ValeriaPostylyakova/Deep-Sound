import { Link } from 'react-router-dom';

import { IoHome } from 'react-icons/io5';
import { MdFavorite } from 'react-icons/md';
import { MdPlaylistPlay } from 'react-icons/md';
import CreatePlaylistButton from './CreatePlaylistButton.tsx';
import PlaylistBlock from './PlaylistBlock.tsx';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__top">
                    <ul>
                        <Link to="/">
                            <li>
                                <IoHome
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        color: 'blue',
                                    }}
                                />
                                <p>Главная</p>
                            </li>
                        </Link>
                        <Link to="favorite">
                            <li>
                                <MdFavorite
                                    style={{
                                        width: '21px',
                                        height: '21px',
                                        color: 'red',
                                    }}
                                />
                                <p>Избранное</p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebar__bottom">
                    <Link to="custom">
                        <div className="sidebar__bottom-container">
                            <MdPlaylistPlay
                                style={{ width: '25px', height: '25px' }}
                            />
                            <p>Мои плейлисты</p>
                        </div>
                    </Link>
                    <CreatePlaylistButton />
                    <div className="sidebar__playlists">
                        <PlaylistBlock />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

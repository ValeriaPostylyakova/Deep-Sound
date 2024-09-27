import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import { home, favorite, plus, playlist } from '../viteImages/images.ts';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__top">
                    <ul>
                        <Link to="/">
                            <li>
                                <img src={home} alt="home" />
                                <p>Главная</p>
                            </li>
                        </Link>
                        <Link to="favorite">
                            <li>
                                <img src={favorite} alt="favorite" />
                                <p>Закладки</p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebar__bottom">
                    <div>
                        <img src={playlist} alt="playlist" />
                        <p>Мои плейлисты</p>
                    </div>
                    <button>
                        <img src={plus} alt="plus" />
                        <p>Создать плейлист</p>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

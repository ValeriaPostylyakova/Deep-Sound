import homeImg from '../assets/img/home.svg';
import favoriteImg from '../assets/img/favorite.svg';
import plusImg from '../assets/img/plus.svg';
import playlistImg from '../assets/img/playlist.svg';

const home: string = String(homeImg);
const favorite: string = String(favoriteImg);
const plus: string = String(plusImg);
const playlist: string = String(playlistImg);

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar__container">
                <div className="sidebar__top">
                    <ul>
                        <li>
                            <img src={home} alt="home" />
                            <p>Главная</p>
                        </li>
                        <li>
                            <img src={favorite} alt="favorite" />
                            <p>Закладки</p>
                        </li>
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

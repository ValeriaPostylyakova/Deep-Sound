import * as React from 'react';
import { Link } from 'react-router-dom';

import { home, favorite, plus, playlist } from '../viteImages/images.ts';

type BurgerMenuProps = {
    menu: boolean;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menu }) => {
    return (
        <>
            <div className={menu ? 'burger-menu__background' : ''}></div>
            <div className={menu ? 'burger-menu menu-active' : 'burger-menu'}>
                <div className="sidebar__container">
                    <div className="sidebar__top">
                        <ul>
                            <Link to="/">
                                <li>
                                    <img src={home} alt="home" />
                                    <p>Главная</p>
                                </li>
                            </Link>
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
            </div>
        </>
    );
};

export default BurgerMenu;

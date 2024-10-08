import * as React from 'react';
import { Link } from 'react-router-dom';

import { IoHome } from 'react-icons/io5';
import { MdFavorite, MdPlaylistPlay } from 'react-icons/md';
import CreatePlaylistButton from './Sidebar/CreatePlaylistButton.tsx';

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
                                    <p>Закладки</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="sidebar__bottom">
                        <div>
                            <MdPlaylistPlay
                                style={{ width: '25px', height: '25px' }}
                            />
                            <p>Мои плейлисты</p>
                        </div>

                        <CreatePlaylistButton />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BurgerMenu;

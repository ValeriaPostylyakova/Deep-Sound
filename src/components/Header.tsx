import * as React from 'react';
import { Link } from 'react-router-dom';

import BurgerMenu from './BurgerMenu.tsx';
import Search from './Search.tsx';

import { logo, menu, close, sun, search, user } from '../viteImages/images.ts';

const Header = () => {
    const [menuActive, setMenuActive] = React.useState<boolean>(false);
    const [searchActive, setSearchActive] = React.useState<boolean>(false);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__right">
                    <Link to="/">
                        <div className="header__logo">
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>
                    <Search searchState={searchActive} />
                </div>
                <div className="header__left">
                    {!searchActive && (
                        <button
                            onClick={() => setSearchActive(!searchActive)}
                            className="header__left-search-mobail"
                        >
                            <img width={30} src={search} alt="search" />
                        </button>
                    )}
                    <button>
                        <img src={user} alt="user" />
                    </button>
                    <button>
                        <img src={sun} alt="sun" />
                    </button>
                    <button
                        className="burger-menu__button"
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        {menuActive ? (
                            <img src={close} alt="close" />
                        ) : (
                            <img src={menu} alt="menu" />
                        )}
                    </button>
                    <BurgerMenu menu={menuActive} />
                </div>
            </div>
        </header>
    );
};

export default Header;

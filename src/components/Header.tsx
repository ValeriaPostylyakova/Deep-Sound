import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
// import { FiMoon } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import BurgerMenu from './BurgerMenu.tsx';
import Search from './Search.tsx';
import { RiNeteaseCloudMusicLine } from "react-icons/ri";

import {logo} from '../viteImages/images.ts';

const Header = () => {
    const [menuActive, setMenuActive] = React.useState<boolean>(false);
    const [searchActive, setSearchActive] = React.useState<boolean>(false);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__right">
                    <Link to="/">
                        <div className="header__logo">
                            {/*<img src={logo} alt="logo" />*/}
                            <RiNeteaseCloudMusicLine className="header__logo_icon"/>
                            <div>
                                <p>DEEP</p>
                                <p>SOUND</p>
                            </div>
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
                            <CiSearch className="header__left-search-mobail-search"/>
                        </button>
                    )}
                    <button>
                        <FaRegUserCircle className="header__user" />
                    </button>
                    <button>
                        <MdOutlineWbSunny className="header__sun" />
                    </button>
                    <button
                        className="burger-menu__button"
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        {menuActive ? (
                            <IoClose className="burger-menu__button_icon"/>
                        ) : (
                            <HiOutlineMenuAlt1 className="burger-menu__button_icon"/>
                        )}
                    </button>
                    <BurgerMenu menu={menuActive} />
                </div>
            </div>
        </header>
    );
};

export default Header;

import searchImg from '../assets/img/search.svg';
import userImg from '../assets/img/user.svg';
import sunImg from '../assets/img/sun.svg';
import logoImg from '../assets/img/logo.svg';

const search: string = String(searchImg);
const user: string = String(userImg);
const sun: string = String(sunImg);
const logo: string = String(logoImg);

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__right">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header__search">
                        <div className="header__search_container">
                            <img src={search} alt="search" />
                            <input type="text" placeholder="Хочу послушать" />
                        </div>
                    </div>
                </div>
                <div className="header__left">
                    <button>
                        <img src={user} alt="user" />
                    </button>
                    <button>
                        <img src={sun} alt="sun" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

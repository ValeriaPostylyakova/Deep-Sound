import * as React from 'react';
import SidebarContainer from './Sidebar/SidebarContainer.tsx';

type BurgerMenuProps = {
    menu: boolean;
    setMenu: (value: boolean) => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menu, setMenu }) => {
    return (
        <>
            <div onClick={() => setMenu(false)} className={menu ? 'burger-menu__background' : ''}></div>
            <div onClick={() => setMenu(false)} className={menu ? 'burger-menu menu-active' : 'burger-menu'}>
                <SidebarContainer/>
            </div>
        </>
    );
};

export default BurgerMenu;

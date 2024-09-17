import * as React from 'react';

import { search } from '../viteImages/images.ts';

type SearchProps = {
    searchState: boolean;
};

const Search: React.FC<SearchProps> = ({ searchState }) => {
    return (
        <>
            <div
                className={
                    searchState
                        ? 'header__search search-active'
                        : 'header__search'
                }
            >
                <div className="header__search_container">
                    <img src={search} alt="search" />
                    <input type="text" placeholder="Хочу послушать" />
                </div>
            </div>
        </>
    );
};

export default Search;

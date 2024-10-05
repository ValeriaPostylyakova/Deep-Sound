import * as React from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { setSearchValue } from '../redux/filter/filterSlice.ts';
import { CiSearch } from 'react-icons/ci';

type SearchProps = {
    searchState: boolean;
};

const Search: React.FC<SearchProps> = ({ searchState }) => {
    const [value, setValue] = React.useState('');
    const dispatch: AppDispatch = useDispatch();

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(setSearchValue(event.target.value));
    };

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
                    <CiSearch className="header__search_container_search"/>
                    <input
                        value={value}
                        onChange={onChangeInput}
                        type="text"
                        placeholder="Хочу послушать"
                    />
                </div>
            </div>
        </>
    );
};

export default Search;

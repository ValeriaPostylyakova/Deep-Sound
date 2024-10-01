import * as React from 'react';

import { setCategoryIndex } from '../redux/filter/filterSlice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { RootState } from '../redux/store.ts';

type CategoryArray = {
    value: string;
    link: string;
};

export const categoryValue: CategoryArray[] = [
    { value: 'Все', link: '/' },
    { value: 'Русская поп-музыка', link: 'chart' },
    { value: 'Диско', link: 'genres' },
    { value: 'К-pop', link: 'collections' },
];

const Category: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { categoryIndex } = useSelector((state: RootState) => state.filter);

    const onClickCategory = (index: number) => {
        dispatch(setCategoryIndex(index));
    };

    return (
        <nav>
            <ul className="main__category">
                {categoryValue.map((obj: CategoryArray, index: number) => (
                    <li key={index}>
                        <button
                            className={index === categoryIndex ? 'active' : ''}
                            onClick={() => onClickCategory(index)}
                        >
                            {obj.value}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Category;

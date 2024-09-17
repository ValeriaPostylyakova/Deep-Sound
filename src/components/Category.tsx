import * as React from 'react';
import { Link } from 'react-router-dom';
import { setCategoryIndex } from '../redux/filter/filterSlice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';

type CategoryArray = {
    value: string;
    link: string;
};

const Category: React.FC = () => {
    const categoryValue: CategoryArray[] = [
        { value: 'Все', link: '/' },
        { value: 'Чарт', link: 'chart' },
        { value: 'Жанры', link: 'genres' },
        { value: 'Подборки', link: 'collections' },
    ];

    const dispatch: AppDispatch = useDispatch();
    const { categoryIndex } = useSelector((state) => state.filter);

    const onClickCategory = (index) => {
        dispatch(setCategoryIndex(index));
    };

    return (
        <nav>
            <ul className="main__category">
                {categoryValue.map((obj: CategoryArray, index: number) => (
                    <Link to={obj.link} key={index}>
                        <li>
                            <button
                                className={
                                    index === categoryIndex ? 'active' : ''
                                }
                                onClick={() => onClickCategory(index)}
                            >
                                {obj.value}
                            </button>
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default Category;

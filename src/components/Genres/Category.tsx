import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { RootState } from '../../redux/store.ts';

import { CategoryArray } from '../../redux/genres/types.ts';
import { genreAction } from '../../redux/genre/slice.ts';

const Category: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const categoryArray = useSelector(
        (state: RootState) => state.genresReducer.categoryArray
    );
    const categoryId = useSelector(
        (state: RootState) => state.genreReducer.categoryId
    );

    const onClickCategory = (index: number) => {
        dispatch(genreAction.setCategoryId(index));
    };

    return (
        <nav>
            <ul className="main__category">
                {categoryArray.map((obj: CategoryArray, index: number) => (
                    <button
                        key={index}
                        className={
                            index === categoryId
                                ? 'main__category_button active'
                                : 'main__category_button'
                        }
                        onClick={() => onClickCategory(index)}
                    >
                        {obj.value}
                    </button>
                ))}
            </ul>
        </nav>
    );
};

export default Category;

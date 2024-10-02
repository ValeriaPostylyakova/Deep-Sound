import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { RootState } from '../redux/store.ts';
import { setCategoryId } from '../redux/genres/slice.ts';

type CategoryArray = {
    value: string;
};

export const categoryValue: CategoryArray[] = [
    { value: 'Все' },
    { value: 'Русская поп-музыка' },
    { value: 'Диско' },
];

const Category: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { categoryId } = useSelector((state: RootState) => state.genres);

    const onClickCategory = (index: number) => {
        dispatch(setCategoryId(index));
    };

    return (
        <nav>
            <ul className="main__category">
                {categoryValue.map((obj: CategoryArray, index: number) => (
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

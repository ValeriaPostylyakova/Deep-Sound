import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { fetchGenres } from '../redux/genres/asyncAction.ts';

import GoBack from '../components/GoBack.tsx';
import GenresBlock from '../components/GenresBlock.tsx';

const Genres = () => {
    const dispatch: AppDispatch = useDispatch();
    const { genres } = useSelector((state: RootState) => state.genres);

    // React.useEffect(() => {
    //     dispatch(fetchGenres());
    // }, []);

    return (
        <>
            <GoBack />
            <div className="genres__container">
                {genres.map((genre, index: number) => (
                    <GenresBlock key={index} {...genre} />
                ))}
            </div>
        </>
    );
};

export default Genres;

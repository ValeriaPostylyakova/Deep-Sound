import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import GoBack from '../components/GoBack.tsx';
import GenresBlock from '../components/GenresBlock/GenresBlock.tsx';
import * as React from 'react';

const Genres = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { genres } = useSelector((state: RootState) => state.genresReducer);

    return (
        <>
            <GoBack />
            <div className="genres__container">
                {genres.map((genre, index: number) => (
                    <GenresBlock {...genre} key={index} />
                ))}
            </div>
        </>
    );
};

export default Genres;

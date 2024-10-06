import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import GoBack from '../components/GoBack.tsx';
import GenresBlock from '../components/GenresBlock/GenresBlock.tsx';

const Genres = () => {
    const { genres } = useSelector((state: RootState) => state.genres);

    return (
        <>
            <GoBack />
            <div className="genres__container">
                {genres.map((genre, index: number) => (
                    <GenresBlock {...genre} key={index} categoryArray={[]} title=''/>
                ))}
            </div>
        </>
    );
};

export default Genres;

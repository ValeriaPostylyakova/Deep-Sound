import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

const FavoriteModal = () => {
    const favoriteAdded = useSelector(
        (state: RootState) => state.favoriteReducer.favoriteAdded
    );

    return (
        <div
            className={
                favoriteAdded?.added
                    ? 'addFavorite-modal active'
                    : 'addFavorite-modal'
            }
        >
            <p>{favoriteAdded?.title}</p>
        </div>
    );
};

export default FavoriteModal;

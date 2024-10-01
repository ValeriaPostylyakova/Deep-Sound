import { favorite1 } from '../../viteImages/images.ts';

const FavoriteEmpty = () => {
    return (
        <div className="favorite__container_1">
            <div className="favorite__title-container">
                <img src={favorite1} className="favorite__icon"></img>
                <p className="favorite__title">
                    У вас пока нет избранных треков
                </p>
            </div>
        </div>
    );
};

export default FavoriteEmpty;

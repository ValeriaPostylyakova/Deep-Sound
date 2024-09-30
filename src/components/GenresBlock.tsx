import * as React from 'react';
import { Link } from 'react-router-dom';

type GenresBlockProps = {
    imageUrl: string;
};

const GenresBlock: React.FC<GenresBlockProps> = ({ imageUrl }) => {
    return (
        <Link to="/genres/pop" className="genres__container_link">
            <div className="genres__container_playlist">
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;

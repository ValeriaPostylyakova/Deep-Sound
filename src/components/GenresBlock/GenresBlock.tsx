import * as React from 'react';
import { Link } from 'react-router-dom';

type GenresBlockProps = {
    imageUrl: string;
    linkUrl: string;
};

const GenresBlock: React.FC<GenresBlockProps> = ({ imageUrl, linkUrl }) => {
    return (
        <Link to={linkUrl} className="genres__container_link">
            <div className="genres__container_playlist">
                <img src={imageUrl} alt="genre" />
                <div className="genres__container_active"></div>
            </div>
        </Link>
    );
};

export default GenresBlock;

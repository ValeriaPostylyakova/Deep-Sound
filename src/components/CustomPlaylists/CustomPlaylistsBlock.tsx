import { FaMusic } from 'react-icons/fa6';

const CustomPlaylistsBlock = () => {
    return (
        <div className="custplaylist">
            <div className="custplaylist__container-2">
                <div className="custplaylist__images">
                    <FaMusic className="custplaylist__images-icon" />
                </div>
                <h2>Новый плейлист</h2>
                <p>1 трек</p>
            </div>
        </div>
    );
};

export default CustomPlaylistsBlock;

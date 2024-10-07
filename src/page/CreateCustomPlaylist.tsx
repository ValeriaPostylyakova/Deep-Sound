import { RiPlayListLine } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const CreateCustomPlaylist = () => {
    return (
        <div className="custom">
            <div className="custom__container">
                <div className="custom__images">
                    <RiPlayListLine className="custom__images-icon" />
                </div>
                <div className="custom__container-2">
                    <h1>Новый плейлист</h1>
                    <div className="custom__container-2_bottom">
                        <button className="custom__button">
                            <div className="custom__button_container">
                                <FaPlay className="custom__button_container-icon" />
                                <p>Слушать</p>
                            </div>
                        </button>
                        <button className="custom__button-del">
                            <HiOutlineDotsHorizontal className="custom__button_container-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomPlaylist;

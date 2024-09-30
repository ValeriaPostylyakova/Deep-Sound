import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const GoBack = () => {
    return (
        <Link to="/">
            <button className="main__back">
                <div className="main__back_container">
                    <IoIosArrowBack className="main__back_icon" />
                    <p className="main__back_text">Назад</p>
                </div>
            </button>
        </Link>
    );
};

export default GoBack;

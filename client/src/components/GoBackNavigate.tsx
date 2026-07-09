import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

type GoBackNavigateProps = {
    title?: string;
};

const GoBackNavigate = ({ title }: GoBackNavigateProps) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="genres__top">
            <button onClick={goBack} className="genres__top-goback">
                <FaArrowLeft className="genres__top-goback-arrow" />
            </button>
            <h1 className="genres__item-title">{title}</h1>
        </div>
    );
};

export default GoBackNavigate;

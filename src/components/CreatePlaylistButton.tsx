import axios from 'axios';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const CreatePlaylistButton = () => {
    const navigate = useNavigate();
    const onClickCreatePlaylist = () => {
        const obj = { title: 'Новый плейлист', songs: [] };
        axios.post('https://985cc4acb156d262.mokky.dev/createPlaylist', obj);
        navigate('/custom-playlist');
    };

    return (
        <button
            onClick={onClickCreatePlaylist}
            className="sidebar__bottom-create-button"
        >
            <FaPlus style={{ width: '16px', height: '16px' }} />
            <p>Создать плейлист</p>
        </button>
    );
};

export default CreatePlaylistButton;

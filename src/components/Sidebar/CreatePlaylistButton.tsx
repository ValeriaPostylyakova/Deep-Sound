import axios from 'axios';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';

const CreatePlaylistButton = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const onClickCreatePlaylist = async () => {
        const secureID = crypto.randomUUID();
        const obj = {
            parentId: secureID,
            title: 'Новый плейлист',
        };

        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user') || '');

            await axios({
                method: 'post',
                url: 'https://985cc4acb156d262.mokky.dev/createPlaylist',
                data: obj,
                headers: { Authorization: `Bearer ${user.token}` },
            });

            dispatch(createPlaylistAction.setPlaylists(obj));
            navigate(`/Deep-Sound/custom-playlist/${obj.parentId}`);
        } else {
            navigate('/Deep-Sound/registration');
        }
    };

    return (
        <button
            onClick={onClickCreatePlaylist}
            className="sidebar__bottom-create-button"
        >
            <FaPlus style={{ width: '16px', height: '16px' }} />
            <h1>Создать плейлист</h1>
        </button>
    );
};

export default CreatePlaylistButton;

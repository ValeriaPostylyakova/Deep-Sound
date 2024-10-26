import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { FetchData } from '../../utils/getResponseStatus.ts';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';

import { FaPlus } from 'react-icons/fa6';
import { getUser } from '../../utils/getUser.ts';

const CreatePlaylistButton = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const onClickCreatePlaylist = () => {
        const secureID = crypto.randomUUID();
        const obj = {
            parentId: secureID,
            title: 'Новый плейлист',
        };

        const clickCreatePlaylist = async (user: FetchData) => {
            try {
                await axios({
                    method: 'post',
                    url: 'https://985cc4acb156d262.mokky.dev/createPlaylist',
                    data: obj,
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } catch(err) {
                console.error(err);
                alert('Ошибка при создании плейлиста');
            }
        }

        if (localStorage.getItem('user') !== null) {
            const user = getUser();
            clickCreatePlaylist(user);

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

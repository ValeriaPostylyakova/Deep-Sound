import * as React from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';
import { FetchData } from '../../utils/getResponseStatus.ts';

import { getUser } from '../../utils/getUser.ts';
import { CreatePlaylistProps } from './CreatePlaylist.tsx';
import { MdOutlineModeEdit } from 'react-icons/md';

const PlaylistName: React.FC<CreatePlaylistProps> = ({ findObj }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const buttonEditRef = React.useRef<HTMLButtonElement | null>(null);

    const dispatch: AppDispatch = useDispatch();

    const inputValue = useSelector(
        (state: RootState) => state.createPlaylistReducer.inputValue
    );

    const HandleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createPlaylistAction.setInputValue(event.target.value));
    };

    const HandleMouseEnter = () => {
        if (buttonEditRef.current) {
            buttonEditRef.current.style.display = 'block';
        }
    };

    const HandleMouseLeave = () => {
        if (buttonEditRef.current) {
            buttonEditRef.current.style.display = 'none';
        }
    };

    const onClickEnter = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.code === 'Enter') {
            const playlistName = (event.target as HTMLInputElement).value;
            const user = getUser();
            patchPlaylist(playlistName, user);
        }
    };

    const patchPlaylist = async (playlistName: string, user: FetchData) => {
        try {
            await axios({
                method: 'PATCH',
                url: `https://985cc4acb156d262.mokky.dev/createPlaylist/${findObj?.id}`,
                data: { title: playlistName },
                headers: { Authorization: `Bearer ${user.token}` },
            });
            alert(
                'Плейлист обновлён. Чтобы увидеть изменения, перейдите в раздел "Мои плейлисты"'
            );
        } catch (err) {
            console.error(err);
            alert(
                'Ошибка при обновлении плейлиста. Пожалуйста, обновите страницу и попробуйте ещё раз'
            );
        }
    };

    return (
        <div className="custom__container-2_edit">
            <input
                className="enter"
                ref={inputRef}
                onChange={HandleChangeInput}
                type="text"
                value={inputValue}
                onKeyUp={onClickEnter}
                onMouseEnter={HandleMouseEnter}
                onMouseLeave={HandleMouseLeave}
            />
            <button
                ref={buttonEditRef}
                className="custom__container-2_edit-button"
            >
                <MdOutlineModeEdit className="custom__container-2_edit-icon" />
            </button>
        </div>
    );
};

export default PlaylistName;

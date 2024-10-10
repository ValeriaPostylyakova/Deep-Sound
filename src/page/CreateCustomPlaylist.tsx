import { RiPlayListLine } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdOutlineModeEdit } from 'react-icons/md';
import * as React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AppDispatch, RootState } from '../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { createPlaylistAction } from '../redux/createPlaylist/slice.ts';
import { useNavigate } from 'react-router-dom';

const CreateCustomPlaylist = () => {
    const dispatch: AppDispatch = useDispatch();
    const { inputValue, actionBarActive, customPlaylists } = useSelector(
        (state: RootState) => state.createPlaylistReducer
    );
    const playlists = useSelector(
        (state: RootState) => state.createPlaylistReducer.playlists
    );

    const navigate = useNavigate();

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const buttonEditRef = React.useRef<HTMLButtonElement | null>(null);

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

    const onClickActionBar = () => {
        dispatch(createPlaylistAction.setActionBarActive(!actionBarActive));
    };

    const onClickDeletePlaylist = async () => {
        try {
            const id = window.location.pathname.slice(17);
            const findObj = customPlaylists.find((obj) => obj.parentId === id);
            await axios.delete(
                `https://985cc4acb156d262.mokky.dev/createPlaylist/${findObj?.id}`
            );
        } catch (err) {
            console.error(err);
            alert(
                'Ошибка при удалении плейлиста. Пожалуйста, перезагрузите страницу и попробуйте ещё раз'
            );
        }
        navigate('/');
        dispatch(createPlaylistAction.setActionBarActive(false));
    };

    return (
        <div className="custom">
            <div className="custom__container">
                <div className="custom__images">
                    <RiPlayListLine className="custom__images-icon" />
                </div>
                <div className="custom__container-2">
                    <div className="custom__container-2_edit">
                        <input
                            className="enter"
                            ref={inputRef}
                            onChange={HandleChangeInput}
                            type="text"
                            value={inputValue}
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

                    <div className="custom__container-2_bottom">
                        <button
                            disabled={playlists.length === 0}
                            className="custom__button"
                        >
                            <div className="custom__button_container">
                                <FaPlay className="custom__button_container-icon" />
                                <p>Слушать</p>
                            </div>
                        </button>
                        <div className="custom__btn-modal-container">
                            <button
                                onClick={onClickActionBar}
                                className="custom__button-del"
                            >
                                <HiOutlineDotsHorizontal className="custom__button_container-icon" />
                            </button>
                            {actionBarActive && (
                                <div
                                    onClick={onClickDeletePlaylist}
                                    className="custom__button-del_modal"
                                >
                                    <div className="modal__container">
                                        <MdDeleteOutline
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                            }}
                                        />
                                        <p>Удалить плейлист</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomPlaylist;

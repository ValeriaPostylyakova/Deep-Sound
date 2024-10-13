import { RiPlayListLine } from 'react-icons/ri';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { createPlaylistAction } from '../../redux/createPlaylist/slice.ts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomPlaylistObj } from '../../redux/createPlaylist/types.ts';
import { fetchPlaylistTracks } from '../../redux/createPlaylistTracks/asyncAction.ts';

type CreatePlaylistProps = {
    findObj: CustomPlaylistObj | undefined;
};

const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ findObj }) => {
    const dispatch: AppDispatch = useDispatch();

    const id = window.location.pathname.slice(17);

    React.useEffect(() => {
        dispatch(fetchPlaylistTracks(id));
    }, [dispatch, id]);

    const actionBarActive = useSelector(
        (state: RootState) => state.createPlaylistReducer.actionBarActive
    );
    const inputValue = useSelector(
        (state: RootState) => state.createPlaylistReducer.inputValue
    );
    const playlistTracks = useSelector(
        (state: RootState) => state.playlistTracksReducer.playlistTracks
    );

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const buttonEditRef = React.useRef<HTMLButtonElement | null>(null);

    const navigate = useNavigate();

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

    const handleModal = () => {
        dispatch(createPlaylistAction.setDeletePlaylist(false));
        navigate('/');
    };

    const onClickDeletePlaylist = async () => {
        try {
            await axios.delete(
                `https://985cc4acb156d262.mokky.dev/createPlaylist/${findObj?.id}`
            );
        } catch (err) {
            console.error(err);
            alert(
                'Ошибка при удалении плейлиста. Пожалуйста, перезагрузите страницу и попробуйте ещё раз'
            );
        }
        dispatch(createPlaylistAction.setDeletePlaylist(true));
        setTimeout(handleModal, 4000);
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
                            disabled={playlistTracks.length === 0}
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

export default CreatePlaylist;

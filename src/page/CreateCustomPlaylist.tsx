import { RiPlayListLine } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdOutlineModeEdit } from 'react-icons/md';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AppDispatch, RootState } from '../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
    setActionBarActive,
    setInputValue,
} from '../redux/createPlaylist/slice.ts';

const CreateCustomPlaylist = () => {
    const dispatch: AppDispatch = useDispatch();
    const { inputValue, actionBarActive } = useSelector(
        (state: RootState) => state.createPlaylist
    );
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const buttonEditRef = React.useRef<HTMLButtonElement | null>(null);

    const HandleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value));
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

    const onClickEdit = () => {
        inputRef.current?.focus();
    };

    const onClickDelete = () => {
        dispatch(setActionBarActive(!actionBarActive));
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
                            ref={inputRef}
                            onChange={HandleChangeInput}
                            type="text"
                            value={inputValue}
                            onMouseEnter={HandleMouseEnter}
                            onMouseLeave={HandleMouseLeave}
                        />
                        <button
                            ref={buttonEditRef}
                            onClick={onClickEdit}
                            className="custom__container-2_edit-button"
                        >
                            <MdOutlineModeEdit className="custom__container-2_edit-icon" />
                        </button>
                    </div>

                    <div className="custom__container-2_bottom">
                        <button className="custom__button">
                            <div className="custom__button_container">
                                <FaPlay className="custom__button_container-icon" />
                                <p>Слушать</p>
                            </div>
                        </button>
                        <div className="custom__btn-modal-container">
                            <button
                                onClick={onClickDelete}
                                className="custom__button-del"
                            >
                                <HiOutlineDotsHorizontal className="custom__button_container-icon" />
                            </button>
                            {actionBarActive && (
                                <div className="custom__button-del_modal">
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

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import * as React from 'react';
import { UnknownAction } from '@reduxjs/toolkit';

type ActiveBarProps = {
    onClickDelete: () => void;
    title: string;
    activeBar: boolean;
    setAction: (value: boolean) => UnknownAction;
};

const ActiveBarPlaylist: React.FC<ActiveBarProps> = ({
    onClickDelete,
    title,
    activeBar,
    setAction,
}) => {
    const dispatch: AppDispatch = useDispatch();

    const onClickActionBar = () => {
        dispatch(setAction(!activeBar));
    };

    return (
        <div className="custom__btn-modal-container">
            <button onClick={onClickActionBar} className="custom__button-del">
                <HiOutlineDotsHorizontal className="custom__button_container-icon" />
            </button>
            {activeBar && (
                <div
                    onClick={onClickDelete}
                    className="custom__button-del_modal"
                >
                    <div className="modal__container">
                        <MdDeleteOutline
                            style={{
                                width: '20px',
                                height: '20px',
                            }}
                        />
                        <p>{title}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveBarPlaylist;

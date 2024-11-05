import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { profileActions } from '../../redux/profile/slice.ts';
import { FetchData } from '../../utils/getResponseStatus.ts';
import { getUser } from '../../utils/getUser.ts';

import { GiExitDoor } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

const UserProfile = () => {
    const dispatch: AppDispatch = useDispatch();
    const { userProfile, user } = useSelector(
        (state: RootState) => state.profileReducer
    );

    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const user = getUser();
            dispatch(profileActions.setUser(user.data));
        }
    }, [dispatch]);

    const onClickClose = () => {
        dispatch(profileActions.setUserProfile(false));
    };

    const onClickExit = () => {
        localStorage.removeItem('user');
        navigate('/Deep-Sound/');
        window.location.reload();
    };

    const deleteProfile = async (user: FetchData) => {
        try {
            await axios.delete(
                `https://985cc4acb156d262.mokky.dev/users/${user.data.id}`
            );
        } catch(err) {
            console.error(err);
            alert('Ошибка при удалении профиля');
        }
    }

    const onClickProfileDelete = async () => {
        if (localStorage.getItem('user') !== null) {
            const user = getUser();
            deleteProfile(user);
            onClickExit();
        }
    };

    return (
        <div className="user__wrapper">
            <div onClick={onClickClose} className={userProfile ? "user__blur" : ""}></div>
            <div onClick={onClickClose} className={userProfile ? 'user active' : 'user'}>
                <div className="user__container">
                    <div className="user__top">
                        <h1>Профиль</h1>
                        <IoMdClose
                            className="user__top_icon"
                            onClick={onClickClose}
                        />
                    </div>
                    <div className="user__info">
                        <div>
                            <p className="user__info_title">Имя:</p>
                            <p>{user.firstName + ' ' + user.lastName}</p>
                        </div>
                        <div>
                            <p className="user__info_title">Почта:</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <button onClick={onClickExit} className="user__button">
                        <GiExitDoor className="user__button_icon" />
                        <p>Выход</p>
                    </button>
                    <button onClick={onClickProfileDelete} className="user__button">
                        <RiDeleteBin6Line className="user__button_delete" />
                        <p className="user__button_delete-text">Удалить аккаунт</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;

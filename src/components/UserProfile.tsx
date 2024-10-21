import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { profileActions } from '../redux/profile/slice.ts';
import * as React from 'react';
import { GiExitDoor } from 'react-icons/gi';

const UserProfile = () => {
    const dispatch: AppDispatch = useDispatch();
    const { userProfile, user } = useSelector(
        (state: RootState) => state.profileReducer
    );

    React.useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const obj = JSON.parse(localStorage.getItem('user') || '');
            dispatch(profileActions.setUser(obj.data));
        }
    }, []);

    const onClickClose = () => {
        dispatch(profileActions.setUserProfile(false));
    };

    return (
        <div className={userProfile ? 'user active' : 'user'}>
            <div className="user__container">
                <div className="user__top">
                    <h1>Профиль</h1>
                    <IoMdClose
                        className="user__top_icon"
                        onClick={onClickClose}
                    />
                </div>
                <div className="user__info">
                    <p className="user__info_name">
                        Имя: {user.firstName + ' ' + user.lastName}
                    </p>
                    <p className="user__info__email">Почта: {user.email}</p>
                </div>
                <button className="user__button">
                    <GiExitDoor className="user__button_icon" />
                    <p>Выход</p>
                </button>
            </div>
        </div>
    );
};
export default UserProfile;
